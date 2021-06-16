"""Activities representing the items on an itinerary.

Each activity is represented as a class implementing a get method.
"""
import json
import random
from datetime import datetime
from typing import Union

from ..models import ActivityType, City
from ..service_partners import google_places, zomato

DATE_FORMAT = "%Y-%m-%d"


class Activity:
    """Base class abstracting common logic shared by activity classes."""

    def __init__(self, survey_response: Union[str, dict], client_class):
        self.survey_response = (
            json.loads(survey_response)
            if isinstance(survey_response, str)
            else survey_response
        )
        self.client = client_class()
        self.city_code = self.survey_response["city"]
        city_data = [x for x in City.VALUES if x["code"] == self.city_code][0]
        self.city_name = f'{city_data["name"]} {city_data["state"]}'
        self.city_center = f'{city_data["latitude"]},{city_data["longitude"]}'
        self.arrival_date = datetime.strptime(
            self.survey_response["travelDates"][0][:10], DATE_FORMAT
        )
        self.return_date = datetime.strptime(
            self.survey_response["travelDates"][1][:10], DATE_FORMAT
        )
        self.n_days = (self.return_date - self.arrival_date).days + 1

    def get(self):
        """Return a list of activities based on the user's survey response."""
        activities = self.client.search_nearby(
            query=self.query, location=self.city_center
        )
        if len(activities) >= self.n_days:
            activities = random.sample(activities, self.n_days)
        else:
            random.shuffle(activities)
        filtered_activities = [
            {**activity, "activity_type": self.activity_type}
            for activity in activities
        ]

        return filtered_activities


class Biking(Activity):
    """Get biking rental places in a city."""

    def __init__(self, survey_response: Union[str, dict]):
        super().__init__(
            survey_response=survey_response, client_class=google_places.Client,
        )
        self.activity_type = ActivityType(
            name="tour", material_icon=ActivityType.VALUES.tour
        )
        self.query = f"bicycle rental in {self.city_name}"


class Museum(Activity):
    """Get museum places in a city."""

    def __init__(self, survey_response: Union[str, dict]):
        super().__init__(
            survey_response=survey_response, client_class=google_places.Client,
        )
        self.activity_type = ActivityType(
            name="museum", material_icon=ActivityType.VALUES.museum
        )
        self.query = f"museum in {self.city_name}"


class Theater(Activity):
    """Get theater places in a city."""

    def __init__(self, survey_response: Union[str, dict], theater_type: str):
        super().__init__(
            survey_response=survey_response, client_class=google_places.Client,
        )
        self.activity_type = ActivityType(
            name="theater", material_icon=ActivityType.VALUES.theater
        )
        self.query = f"{theater_type} theater in {self.city_name}"


class Beach(Activity):
    """Get beach places in a city."""

    def __init__(self, survey_response: Union[str, dict]):
        super().__init__(
            survey_response=survey_response, client_class=google_places.Client,
        )
        self.activity_type = ActivityType(
            name="beach", material_icon=ActivityType.VALUES.beach
        )
        self.query = f"beach in {self.city_name}"


class Park(Activity):
    """Get park places in a city."""

    def __init__(self, survey_response: Union[str, dict]):
        super().__init__(
            survey_response=survey_response, client_class=google_places.Client,
        )
        self.activity_type = ActivityType(
            name="park", material_icon=ActivityType.VALUES.park
        )
        self.query = f"park in {self.city_name}"


class HistoricBuilding(Activity):
    """Get histrocia buildings in a city."""

    def __init__(self, survey_response: Union[str, dict]):
        super().__init__(
            survey_response=survey_response, client_class=google_places.Client,
        )
        self.activity_type = ActivityType(
            name="historic_building",
            material_icon=ActivityType.VALUES.historic_building,
        )
        self.query = f"historic building in {self.city_name}"


class Dining(Activity):
    """Get restaurants in a city."""

    def __init__(self, survey_response: Union[str, dict]):
        super().__init__(
            survey_response=survey_response, client_class=zomato.Client
        )
        self.city_id = self.client.CITY_IDS[self.survey_response["city"]]
        self.activity_type = ActivityType(
            name="food", material_icon=ActivityType.VALUES.food
        )

    """ override base class method as for Dinning we are using zomato client."""

    def get(self):
        """Get a list of restaurants based on the number of trip days."""
        n_restaurants_per_day = 3
        n_total_restaurants = self.n_days * n_restaurants_per_day
        restaurants = self.client.search_(
            entity_id=self.city_id,
            entity_type="city",
            establishment_type="18",
            cuisines=(
                "1,175,3,131,956,45,140,66,73,137,995,162,82,320,83,972,141,"
                "997"
            ),
            count=n_total_restaurants,
        )
        filtered_restaurants = random.sample(restaurants, n_total_restaurants)
        filtered_restaurants = [
            {**restaurant, "activity_type": self.activity_type}
            for restaurant in filtered_restaurants
        ]

        return filtered_restaurants
