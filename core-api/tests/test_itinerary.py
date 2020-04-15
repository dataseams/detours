from unittest import TestCase
import os
import json

from core_api.restaurant import itinerary


class TestItinerary(TestCase):
    def setUp(self):
        tests_dir = os.path.dirname(__file__)
        survey_response_path = os.path.join(
            tests_dir, "data/sample_survey_response.json"
        )
        restaurants_path = os.path.join(tests_dir, "data/restaurants.json")
        with open(survey_response_path, "r") as f:
            self.survey_response = f.read()
        with open(restaurants_path, "r") as f:
            self.restaurants = json.load(f)

    def test_get_restaurants_happy_path(self):
        restaurants = itinerary.get_restaurants(
            survey_response=self.survey_response
        )
        print(restaurants)

    def test_store_restaurants_happy_path(self):
        results = itinerary.store_restaurants(self.restaurants)
