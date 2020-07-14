from unittest import TestCase

from core_api.activity import googe_places
from core_api.activity import itinerary


class TestGooglePlaces(TestCase):
    def test_client_happy_path(self):
        places = googe_places.Client()
        # bicycle_rentals = places.search(query="Bicycle rental")
        # self.assertIsNotNone(bicycle_rentals)


class TestGetActivities(TestCase):
    def test_happy_path(self):
        survey_response = {"city": "LA"}
        activities = itinerary.get_activities(survey_response)
        self.assertIsInstance(activities, list)
        self.assertEqual(len(activities), 1)
