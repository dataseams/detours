"""
Logic to create the itinerary.

The itinerary is created based on:
- Survey reponse.
- Queried APIs.
"""
import json
import random
from datetime import datetime

from .zomato import Zomato

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
    filtered_restaurants = random.sample(restaurants, n_total_restaurants)

    return filtered_restaurants
