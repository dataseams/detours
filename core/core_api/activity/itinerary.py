"""
Logic to search for activities for user survey.

The itinerary is created based on:
- Survey reponse.
- Queried APIs.
"""
import json
import random

from .googe_places import Client
from ..models import City

DATE_FORMAT = "%Y-%m-%d"


def parse_survey_response(survey_response: str):
    """Transform text survey response into an easily accessible dictionary."""
    survey_response_parsed = json.loads(survey_response)
    return survey_response_parsed


def get_activities(survey_response: str):
    """Return a list of activities based on the user's survey response."""
    google_places = Client()
    parsed_survey_response = survey_response
    city_code = parsed_survey_response["city"]
    city_name = [
        x["name"] + " " + x["state"]
        for x in City.VALUES
        if x["code"] == city_code
    ][0]

    activities = google_places.search(query=f"bicycle rental in {city_name}")
    filtered_activities = random.sample(activities, 1)

    return filtered_activities
