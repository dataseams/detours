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
        itinerary_items = {}
        itinerary_items.update(
            {"restaurants": Dining(self.survey_response).get()}
        )
        itinerary_items.update(
            {"bicycles": Biking(self.survey_response).get()}
        )
        return itinerary_items

    def save(self):
        """Create all itinerary items and save to database."""
        time_of_day = models.TimeOfDay.query.filter_by(name="morning").first()
        activity_type_food = models.ActivityType.query.filter_by(
            name="food"
        ).first()
        activity_type_tour = models.ActivityType.query.filter_by(
            name="tour"
        ).first()

        places = []
        for place in self.itinerary_items["restaurants"]:
            restaurant = place["restaurant"]
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
                    "type": activity_type_food,
                }
            )
        for place in self.itinerary_items["bicycles"]:
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
                    "type": activity_type_tour,
                }
            )
        for place in places:
            db_session.add(place["place"])
        db_session.commit()

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

        destination_city = models.City.query.filter_by(
            code=self.city_code
        ).first()

        trip_plan = models.TripPlan(
            survey_response_id=self.survey_response_id,
            start_date=self.arrival_date,
            end_date=self.return_date,
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
            start=self.arrival_date, end=self.return_date, freq="D",
        ):
            daily_plans.append(
                models.DailyPlan(date=trip_date, trip_plan=trip_plan)
            )
        for v in daily_plans:
            db_session.add(v)
        db_session.commit()

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

        return self.survey_response_id
