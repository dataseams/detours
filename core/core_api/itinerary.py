"""
Logic to create the itinerary.

The itinerary is created based on:
- Survey reponse.
- Queried APIs.
"""
from typing import List, Dict
import multiprocessing as mp

import pandas as pd

from .config import db_session
from . import models
from .activities import (
    Dining,
    Biking,
    Museum,
    Theater,
    Beach,
    Park,
    HistoricBuilding,
)
from .utils import ItineraryTag

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


def get_activities(
    survey_response: dict, time_of_day: str, food_or_activities: str
) -> dict:
    """Get activities based on provided parameters.

    Function made to be called in parallel to improve app's response time
    when building an itinerary.

    Parameters
    ----------
    survey_response : dict
        User survey response
    time_of_day : str
        One of morning, noon, or evening
    food_or_activities : str
        Either food or activities, this allows calling the relative API

    Returns
    -------
    dict
        Activity items as a structured itinerary object
    """
    itinerary_items = {
        "morning": {"food": [], "activities": []},
        "noon": {"food": [], "activities": []},
        "evening": {"food": [], "activities": []},
    }
    if food_or_activities == "food":
        n_days = trip_length(
            arrival_date=survey_response.get("travelDates")[0],
            return_date=survey_response.get("travelDates")[1],
        )
        restaurants = Dining(survey_response).get()
        breakfast = restaurants[:n_days]
        lunch = restaurants[n_days : 2 * n_days]
        dinner = restaurants[2 * n_days :]
        itinerary_items = {
            "morning": {"food": breakfast, "activities": []},
            "noon": {"food": lunch, "activities": []},
            "evening": {"food": dinner, "activities": []},
        }
    if food_or_activities == "activities":
        if time_of_day == "morning":
            itinerary_items["morning"]["activities"].extend(
                Biking(survey_response).get()
            )
            itinerary_items["morning"]["activities"].extend(
                Beach(survey_response).get()
            )
            itinerary_items["morning"]["activities"].extend(
                HistoricBuilding(survey_response).get()
            )
        if time_of_day == "noon":
            itinerary_items["noon"]["activities"].extend(
                Museum(survey_response).get()
            )
            itinerary_items["noon"]["activities"].extend(
                Park(survey_response).get()
            )
        if time_of_day == "evening":
            itinerary_items["evening"]["activities"].extend(
                Theater(survey_response).get(theater_type="art")
            )
            itinerary_items["evening"]["activities"].extend(
                Theater(survey_response).get(theater_type="comedy")
            )
    return itinerary_items


class Builder:
    """Build an itinerary given the a user survey parameters."""

    def __init__(self, survey_response: dict, survey_response_id: int):
        self.survey_response = survey_response
        self.survey_response_id = survey_response_id
        self.city_code = survey_response.get("city")
        self.arrival_date = survey_response.get("travelDates")[0]
        self.return_date = survey_response.get("travelDates")[1]
        self.itinerary_items = self._build()

    def _build(self) -> Dict[str, Dict[str, List[dict]]]:
        """Query external APIs to formulate all itinerary activities.

        Parameters
        ----------
        survey_response : dict
            User's survey response

        Returns
        -------
        Dict[str, List[dict]]
            Dict of itinerary items
        """
        itinerary_items = {
            "morning": {"food": [], "activities": []},
            "noon": {"food": [], "activities": []},
            "evening": {"food": [], "activities": []},
        }
        n_processes = mp.cpu_count() - 1
        with mp.Pool(processes=n_processes) as pool:
            results = pool.starmap(
                get_activities,
                zip(
                    [self.survey_response] * 4,
                    ["", "morning", "noon", "evening"],
                    ["food", "activities", "activities", "activities"],
                ),
            )
        for item in results:
            for time_of_day in item:
                for food_or_activities in item[time_of_day]:
                    itinerary_items[time_of_day][food_or_activities].extend(
                        item[time_of_day][food_or_activities]
                    )

        return itinerary_items

    def _save_return_places(
        self, itinerary_items: list, activity_types: models.TableValues
    ):
        """Save places and return the list of places objects."""
        places = {
            "morning": {"food": [], "activities": []},
            "noon": {"food": [], "activities": []},
            "evening": {"food": [], "activities": []},
        }

        for day_period in self.itinerary_items:
            for restaurant_obj in self.itinerary_items[day_period]["food"]:
                restaurant = restaurant_obj["restaurant"]
                places[day_period]["food"].append(
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
            for place in self.itinerary_items[day_period]["activities"]:
                places[day_period]["activities"].append(
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
        for day_period in places:
            for partner_type in places[day_period]:
                for place in places[day_period][partner_type]:
                    db_session.add(place["place"])
        db_session.commit()
        return places

    def _save_return_activities(self, places: list):
        """Save activities from list of place objects."""
        activities = {
            "morning": {"food": [], "activities": []},
            "noon": {"food": [], "activities": []},
            "evening": {"food": [], "activities": []},
        }
        for day_period in places:
            for partner_type in places[day_period]:
                for place in places[day_period][partner_type]:
                    activities[day_period][partner_type].append(
                        models.Activity(
                            name=place["type"].name,
                            place=place["place"],
                            activity_type=place["type"],
                        )
                    )

        for day_period in activities:
            for partner_type in activities[day_period]:
                for activity in activities[day_period][partner_type]:
                    db_session.add(activity)
        db_session.commit()
        return activities

    def _save_plans(
        self,
        city_code: str,
        survey_response_id: int,
        arrival_date,
        return_date,
        interests_matched: List,
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
            interests_matched=interests_matched,
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
        plan_items = []
        for day_index, daily_plan in enumerate(daily_plans):
            order = 0
            for day_period in ["morning", "noon", "evening"]:
                if day_index in range(len(activities[day_period]["food"])):
                    plan_items.append(
                        models.PlanItem(
                            order=order,
                            daily_plan=daily_plan,
                            activity=activities[day_period]["food"][day_index],
                        )
                    )
                    order += 1
                if day_index in range(
                    len(activities[day_period]["activities"])
                ):
                    plan_items.append(
                        models.PlanItem(
                            order=order,
                            daily_plan=daily_plan,
                            activity=activities[day_period]["activities"][
                                day_index
                            ],
                        )
                    )
                    order += 1
        for plan_item in plan_items:
            db_session.add(plan_item)
        db_session.commit()

    def save(self):
        """Create all itinerary items and save to database."""
        activity_types = models.ActivityType.get_all()
        places = self._save_return_places(
            itinerary_items=self.itinerary_items, activity_types=activity_types
        )
        activities = self._save_return_activities(places=places)

        interests_matched = [
            k.capitalize()
            for k, v in self.survey_response["generalPreferences"].items()
            if v
        ]
        interests_matched.extend(
            [
                ItineraryTag.format_dining(k)
                for k, v in self.survey_response["dining"][
                    "environment"
                ].items()
                if v
            ]
        )

        trip_plan, daily_plans = self._save_plans(
            city_code=self.city_code,
            survey_response_id=self.survey_response_id,
            arrival_date=self.arrival_date,
            return_date=self.return_date,
            interests_matched=interests_matched,
        )

        self._save_plan_items(activities=activities, daily_plans=daily_plans)

        return self.survey_response_id
