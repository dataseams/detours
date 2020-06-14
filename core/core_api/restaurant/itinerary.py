"""
Logic to create the itinerary.

The itinerary is created based on:
- Survey reponse.
- Queried APIs.
"""
import json
import random
from datetime import datetime

import pandas as pd

from .zomato import Zomato
from ..config import db_session
from .. import models

DATE_FORMAT = "%Y-%m-%d"


def parse_survey_response(survey_response: str):
    """Transform text survey response into an easily accessible dictionary."""
    survey_response_parsed = json.loads(survey_response)
    return survey_response_parsed


def get_restaurants(survey_response: str):
    """Return a list of restaurants based in the itinerary length in days."""
    zomato = Zomato()
    parsed_survey_response = survey_response
    city_id = zomato.CITY_IDS[parsed_survey_response["city"]]
    arrival_date = datetime.strptime(
        parsed_survey_response["arrivalDate"][:10], DATE_FORMAT
    )
    return_date = datetime.strptime(
        parsed_survey_response["returnDate"][:10], DATE_FORMAT
    )
    n_days = (return_date - arrival_date).days + 1
    n_restaurants_per_day = 3
    n_total_restaurants = n_days * n_restaurants_per_day
    restaurants = zomato.search_(
        entity_id=city_id,
        entity_type="city",
        establishment_type="18",
        cuisines=(
            "1,175,3,131,956,45,140,66,73,137,995,162,82,320,83,972,141,997"
        ),
        count=n_total_restaurants,
    )
    filtered_restaurants = random.sample(
        restaurants, n_days * n_restaurants_per_day
    )

    return filtered_restaurants


def store_restaurants(
    restaurants: list,
    city_code: str,
    survey_response_id: int,
    survey_response: dict,
):
    """Create all itinerary items and save to database."""
    time_of_day = models.TimeOfDay.query.filter_by(name="morning").first()
    activity_type = models.ActivityType.query.filter_by(name="food").first()

    places = []
    for place in restaurants:
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
