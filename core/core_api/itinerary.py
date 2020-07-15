"""
Logic to create the itinerary.

The itinerary is created based on:
- Survey reponse.
- Queried APIs.
"""
from typing import List

import pandas as pd

from .config import db_session
from . import models

DATE_FORMAT = "%Y-%m-%d"


def get_activities(survey_response: dict) -> List[dict]:
    """Query external APIs to formulate all itinerary activities.

    Parameters
    ----------
    survey_response : dict
        User's survey response.

    Returns
    -------
    List[dict]
        List of itinerary items.
    """
    pass


def store_activities(
    itinerary_items: list,
    city_code: str,
    survey_response_id: int,
    survey_response: dict,
):
    """Create all itinerary items and save to database."""
    time_of_day = models.TimeOfDay.query.filter_by(name="morning").first()
    activity_type = models.ActivityType.query.filter_by(name="food").first()

    places = []
    for place in itinerary_items:
        restaurant = place["restaurant"]
        places.append(
            models.Place(
                name=restaurant["name"],
                description=restaurant["cuisines"],
                address=restaurant["location"]["address"],
                locality=restaurant["location"]["locality"],
                zipcode=restaurant["location"]["zipcode"],
                latitude=restaurant["location"]["latitude"],
                longitude=restaurant["location"]["longitude"],
            )
        )
    for place in places:
        db_session.add(place)
    db_session.commit()

    activities = []
    for place in places:
        activities.append(
            models.Activity(
                name="eat", place=place, activity_type=activity_type,
            )
        )
    for v in activities:
        db_session.add(v)
    db_session.commit()

    destination_city = models.City.query.filter_by(code=city_code).first()

    trip_plan = models.TripPlan(
        survey_response_id=survey_response_id,
        start_date=survey_response.get("arrivalDate"),
        end_date=survey_response.get("returnDate"),
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
        start=survey_response.get("arrivalDate"),
        end=survey_response.get("returnDate"),
        freq="D",
    ):
        daily_plans.append(
            models.DailyPlan(date=trip_date, trip_plan=trip_plan)
        )
    for v in daily_plans:
        db_session.add(v)
    db_session.commit()

    for i, daily_plan in enumerate(daily_plans):
        for j in range(3):
            k = (i + 1) * (j + 1)
            db_session.add(
                models.PlanItem(
                    order=i + 1,
                    daily_plan=daily_plan,
                    activity=activities[k - 1],
                )
            )
    db_session.commit()

    return survey_response_id
