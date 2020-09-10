"""
Logic to create the itinerary.

The itinerary is created based on:
- Survey reponse.
- Queried APIs.
"""
from typing import List, Dict

import pandas as pd

from .config import db_session
from . import models
from .activities import Dining, Biking

DATE_FORMAT = "%Y-%m-%d"


def trip_length(arrival_date: str, return_date: str) -> int:
    """Calculate trip length in days from arrival and return dates.

    Parameters
    ----------
    arrival_date : str
        Arrival date
    return_date : str
        Return date

    Returns
    -------
    int
        Length of trip in days
    """
    n_days = (
        pd.to_datetime(return_date) - pd.to_datetime(arrival_date)
    ).days + 1

    return n_days


class Builder:
    """Build an itinerary given the a user survey parameters."""

    def __init__(self, survey_response: dict, survey_response_id: int):
        self.survey_response = survey_response
        self.survey_response_id = survey_response_id
        self.city_code = survey_response.get("city")
        self.arrival_date = survey_response.get("arrivalDate")
        self.return_date = survey_response.get("returnDate")
        self.itinerary_items = self._build()

    def _build(self) -> Dict[str, List[dict]]:
        """Query external APIs to formulate all itinerary activities.

        Parameters
        ----------
        survey_response : dict
            User's survey response.

        Returns
        -------
        Dict[str, List[dict]]
            Dict of itinerary items.
        """
        n_days = trip_length(
            arrival_date=self.arrival_date, return_date=self.return_date
        )
        restaurants = Dining(self.survey_response).get()
        breakfast = restaurants[:n_days]
        lunch = restaurants[n_days : 2 * n_days]
        dinner = restaurants[2 * n_days :]
        itinerary_items = {
            "morning": {"food": breakfast},
            "noon": {"food": lunch},
            "evening": {"food": dinner},
        }
        itinerary_items["morning"].update(
            {"activities": Biking(self.survey_response).get()}
        )
        return itinerary_items

    def _save_return_places(
        self, itinerary_items: list, activity_types: models.TableValues
    ):
        """Save places and return the list of places objects."""
        places = []

        for day_period in self.itinerary_items:
            for restaurant_obj in self.itinerary_items[day_period]["food"]:
                restaurant = restaurant_obj["restaurant"]
                places.append(
                    {
                        "place": models.Place(
                            name=restaurant["name"],
                            description=restaurant["cuisines"],
                            address=restaurant["location"]["address"],
                            locality=restaurant["location"]["locality"],
                            zipcode=restaurant["location"]["zipcode"],
                            latitude=restaurant["location"]["latitude"],
                            longitude=restaurant["location"]["longitude"],
                        ),
                        "type": activity_types.food,
                    }
                )
            for place in self.itinerary_items[day_period].get(
                "activities", []
            ):
                places.append(
                    {
                        "place": models.Place(
                            name=place["name"],
                            description=place["name"],
                            address=place["formatted_address"],
                            locality=None,
                            zipcode=None,
                            latitude=place["geometry"]["location"]["lat"],
                            longitude=place["geometry"]["location"]["lng"],
                        ),
                        "type": activity_types.tour,
                    }
                )

        for place in places:
            db_session.add(place["place"])
        db_session.commit()
        return places

    def _save_return_activities(self, places: list):
        """Save activities from list of place objects."""
        activities = []
        for place in places:
            activities.append(
                models.Activity(
                    name=place["type"].name,
                    place=place["place"],
                    activity_type=place["type"],
                )
            )
        for activity in activities:
            db_session.add(activity)
        db_session.commit()
        return activities

    def _save_plans(
        self,
        city_code: str,
        survey_response_id: int,
        arrival_date,
        return_date,
    ):
        """Save trip and daily plans."""
        destination_city = models.City.query.filter_by(code=city_code).first()

        time_of_day = models.TimeOfDay.query.filter_by(name="morning").first()
        trip_plan = models.TripPlan(
            survey_response_id=survey_response_id,
            start_date=arrival_date,
            end_date=return_date,
            start_time_of_day=time_of_day,
            # end_time_of_day=time_of_day["evening"],
            city=destination_city,
            spending_per_day="176",
            hours_saved="20-30",
            interests_matched=[
                "Intimate, authentic dining",
                "Markets",
                "Massages",
                "Walking tours",
                "Wine bars",
            ],
        )
        db_session.add(trip_plan)
        db_session.commit()

        daily_plans = []
        for trip_date in pd.date_range(
            start=arrival_date, end=return_date, freq="D",
        ):
            daily_plans.append(
                models.DailyPlan(date=trip_date, trip_plan=trip_plan)
            )
        for v in daily_plans:
            db_session.add(v)
        db_session.commit()
        return trip_plan, daily_plans

    def _save_plan_items(self, activities: list, daily_plans: list):
        """Save plan items from activities and daily plans."""
        foods = [
            activity
            for activity in activities
            if activity.activity_type.name == "food"
        ]
        tours = [
            activity
            for activity in activities
            if activity.activity_type.name == "tour"
        ]
        all_items = []
        for i in range(len(foods)):
            item = [foods[i]]
            if i < len(tours):
                item.append(tours[i])
            all_items.append(item)
        order = 0
        for i, daily_plan in enumerate(daily_plans):
            for j in range(3):
                k = (i + 1) * (j + 1)
                food = all_items[k - 1][0]
                tour = (
                    all_items[k - 1][1] if len(all_items[k - 1]) == 2 else None
                )
                order = order + 1
                db_session.add(
                    models.PlanItem(
                        order=order, daily_plan=daily_plan, activity=food,
                    )
                )
                if tour:
                    order = order + 1
                    db_session.add(
                        models.PlanItem(
                            order=order, daily_plan=daily_plan, activity=tour,
                        )
                    )
        db_session.commit()

    def save(self):
        """Create all itinerary items and save to database."""
        activity_types = models.ActivityType.get_all()
        places = self._save_return_places(
            itinerary_items=self.itinerary_items, activity_types=activity_types
        )
        activities = self._save_return_activities(places=places)

        trip_plan, daily_plans = self._save_plans(
            city_code=self.city_code,
            survey_response_id=self.survey_response_id,
            arrival_date=self.arrival_date,
            return_date=self.return_date,
        )

        self._save_plan_items(activities=activities, daily_plans=daily_plans)

        return self.survey_response_id
