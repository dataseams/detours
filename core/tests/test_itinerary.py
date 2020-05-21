from unittest import TestCase
from unittest.mock import patch, Mock
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

    @patch("core_api.restaurant.zomato.Zomato.search")
    def test_get_restaurants_happy_path(self, zomato_search_mock):
        zomato_search_mock.return_value = self.restaurants
        restaurants = itinerary.get_restaurants(
            survey_response=self.survey_response
        )
        self.assertEqual(
            sorted(restaurants, key=lambda x: x["restaurant"]["id"]),
            sorted(self.restaurants, key=lambda x: x["restaurant"]["id"]),
        )

    def test_store_restaurants_happy_path(self):
        res = itinerary.store_restaurants(self.restaurants, 1)
        self.assertEqual(res, 1)
