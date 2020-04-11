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


def transform_restaurants(filtered_restaurants):
    """Transform restaurants to an itinerary object."""
    node = {}
    activity = {}
    activity_type = {}
    place = {}
    location = {}

    node["order"] = 1
    place["name"] = filtered_restaurants[0]["name"]
    place["description"] = filtered_restaurants[0]["name"]
    activity_type["name"] = "food"
    activity_type["materialIcon"] = "restaurant"
    activity_name = ""

    node = {
        "order": 1,
        "activity": {
            "activityType": {"name": "hotel", "materialIcon": "hotel"},
            "place": {
                "name": "Maison Natale Bernard Buffet",
                "description": "Featuring a low-key art deco style, this conservative hotel is a 1-minute walk from the Cadet metro station.",
            },
            "name": "wake-up",
        },
    }


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
