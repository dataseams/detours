"""
Logic to create the itinerary.

The itinerary is created based on:
- Survey reponse.
- Queried APIs.
"""
import os
import json
import random
from datetime import datetime, date

import pandas as pd

from .zomato import Zomato
from ..config import engine, db_session, Base
from .. import models

DATE_FORMAT = "%Y-%m-%d"


def parse_survey_response(survey_response: str):
    """Transform text survey response into an easily accessible dictionary."""
    survey_response_parsed = json.loads(survey_response)
    return survey_response_parsed


def get_restaurants(survey_response: str):
    """Return a list of restaurants based in the itinerary length in days."""
    zomato = Zomato()
    parsed_survey_response = parse_survey_response(survey_response)
    city_id = zomato.CITY_IDS[parsed_survey_response["city"]]
    arrival_date = datetime.strptime(
        parsed_survey_response["arrivalDate"][:10], DATE_FORMAT
    )
    return_date = datetime.strptime(
        parsed_survey_response["returnDate"][:10], DATE_FORMAT
    )
    n_days = (return_date - arrival_date).days
    n_restaurants_per_day = 3
    restaurants = zomato.search(entity_id=city_id)
    filtered_restaurants = random.sample(
        restaurants, n_days * n_restaurants_per_day
    )

    return filtered_restaurants


def store_restaurants(restaurants: list, survey_response_id: int = 1):
    """Create all itinerary items and save to database."""
    time_of_day = {}
    for k, v in models.TimeOfDay.VALUES.items():
        time_of_day[k] = models.TimeOfDay(
            name=k, start_time=v[0], end_time=v[1]
        )

    activity_types = {}
    for k, v in models.ActivityType.VALUES.items():
        activity_types[k] = models.ActivityType(name=k, material_icon=v)

    for place in restaurants:
        restaurant = place["restaurant"]
        places = {
            restaurant["name"]: models.Place(
                name=restaurant["name"],
                description="Featuring a low-key art deco style, this conservative"
                " hotel is a 1-minute walk from the Cadet metro "
                "station.",
            )
        }
    for v in places.values():
        db_session.add(v)
    db_session.commit()

    activities = []
    for k, v in places.items():
        activities.append(
            models.Activity(
                name="eat",
                place=v,
                activity_type=activity_types["restaurant"],
            )
        )
    for v in activities:
        db_session.add(v)
    db_session.commit()

    los_angeles = models.City(
        name="Los Angeles", state="California", state_abbr="CA", country="USA"
    )
    db_session.add(los_angeles)
    db_session.commit()

    shahbaz = models.Traveler(first_name="Shahboo", last_name="Khan")
    db_session.add(shahbaz)
    db_session.commit()

    shahbaz_paris_trip_2020 = models.TripPlan(
        survey_response_id=survey_response_id,
        start_date=date(2020, 5, 1),
        end_date=date(2020, 5, 4),
        start_time_of_day=time_of_day["morning"],
        # end_time_of_day=time_of_day["evening"],
        city=los_angeles,
        traveler=shahbaz,
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
    db_session.add(shahbaz_paris_trip_2020)
    db_session.commit()

    daily_plans = []
    for trip_date in pd.date_range(
        start="2020-05-01", end="2020-05-04", freq="D"
    ):
        daily_plans.append(
            models.DailyPlan(date=trip_date, trip_plan=shahbaz_paris_trip_2020)
        )
    for v in daily_plans:
        db_session.add(v)
    db_session.commit()

    for i, daily_plan in enumerate(daily_plans):
        for j in range(3):
            for v in activities:
                k = (i + 1) * (j + 1)
                db_session.add(
                    models.PlanItem(
                        order=i + 1,
                        daily_plan=daily_plan,
                        activity=activities[k],
                    )
                )
    db_session.commit()

    return survey_response_id
