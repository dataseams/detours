"""Activities representing the items on an itinerary.

Each activity is represented as a class implementing a get method.
"""
import json
import random
from datetime import datetime
from typing import Union

from ..service_partners import google_places, zomato
from ..models import City, ActivityType

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
        self.city_name = [
            x["name"] + " " + x["state"]
            for x in City.VALUES
            if x["code"] == self.city_code
        ][0]
        self.arrival_date = datetime.strptime(
            self.survey_response["travelDates"][0][:10], DATE_FORMAT
        )
        self.return_date = datetime.strptime(
            self.survey_response["travelDates"][1][:10], DATE_FORMAT
        )
        self.n_days = (self.return_date - self.arrival_date).days + 1


class Biking(Activity):
    """Get biking rental places in a city."""

    def __init__(self, survey_response: Union[str, dict]):
        super().__init__(
            survey_response=survey_response, client_class=google_places.Client,
        )
        self.activity_type = ActivityType(
            name="tour", material_icon=ActivityType.VALUES.tour
        )

    def get(self):
        """Return a list of activities based on the user's survey response."""
        activities = self.client.search(
            query=f"bicycle rental in {self.city_name}"
        )
        filtered_activities = (
            random.sample(activities, 1) if activities else activities
        )

        return filtered_activities


class Museum(Activity):
    """Get museum places in a city."""

    def __init__(self, survey_response: Union[str, dict]):
        super().__init__(
            survey_response=survey_response, client_class=google_places.Client,
        )
        self.activity_type = ActivityType(
            name="museum", material_icon=ActivityType.VALUES.museum
        )

    def get(self):
        """Return a list of activities based on the user's survey response."""
        activities = self.client.search(query=f"museum in {self.city_name}")
        filtered_activities = (
            random.sample(activities, 1) if activities else activities
        )

        return filtered_activities


class Theater(Activity):
    """Get theater places in a city."""

    def __init__(self, survey_response: Union[str, dict]):
        super().__init__(
            survey_response=survey_response, client_class=google_places.Client,
        )
        self.activity_type = ActivityType(
            name="theater", material_icon=ActivityType.VALUES.theater
        )

    def get(self, theater_type: str):
        """Return a list of activities based on the user's survey response."""
        activities = self.client.search(
            query=f"{theater_type} theater in {self.city_name}"
        )
        filtered_activities = (
            random.sample(activities, 1) if activities else activities
        )

        return filtered_activities


class Beach(Activity):
    """Get beach places in a city."""

    def __init__(self, survey_response: Union[str, dict]):
        super().__init__(
            survey_response=survey_response, client_class=google_places.Client,
        )
        self.activity_type = ActivityType(
            name="beach", material_icon=ActivityType.VALUES.beach
        )

    def get(self):
        """Return a list of activities based on the user's survey response."""
        activities = self.client.search(query=f"beach in {self.city_name}")
        filtered_activities = (
            random.sample(activities, 1) if activities else activities
        )

        return filtered_activities


class Park(Activity):
    """Get park places in a city."""

    def __init__(self, survey_response: Union[str, dict]):
        super().__init__(
            survey_response=survey_response, client_class=google_places.Client,
        )
        self.activity_type = ActivityType(
            name="park", material_icon=ActivityType.VALUES.park
        )

    def get(self):
        """Return a list of activities based on the user's survey response."""
        activities = self.client.search(query=f"park in {self.city_name}")
        filtered_activities = (
            random.sample(activities, 1) if activities else activities
        )
        filtered_activities = [
            {**activity, "activity_type": self.activity_type}
            for activity in filtered_activities
        ]

        return filtered_activities


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

    def get(self):
        """Return a list of activities based on the user's survey response."""
        activities = self.client.search(
            query=f"historic building in {self.city_name}"
        )
        filtered_activities = (
            random.sample(activities, 1) if activities else activities
        )

        return filtered_activities


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
