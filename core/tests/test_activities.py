import json
import os
from unittest import TestCase
from unittest.mock import Mock, patch

from core_api import activities


class TestDining(TestCase):
    def setUp(self):
        tests_dir = os.path.dirname(__file__)
        survey_response_path = os.path.join(
            tests_dir, "data/sample_survey_response.json"
        )
        restaurants_path = os.path.join(tests_dir, "data/restaurants.json")
        with open(survey_response_path, "r") as f:
            self.survey_response = json.load(f)
        with open(restaurants_path, "r") as f:
            self.restaurants = json.load(f)

    @patch("core_api.service_partners.zomato.Client.search_")
    def test_get_restaurants_happy_path(self, zomato_search_mock):
        zomato_search_mock.return_value = self.restaurants
        restaurants = [
            {"restaurant": r["restaurant"]}
            for r in activities.Dining(self.survey_response).get()
        ]
        self.assertEqual(
            sorted(restaurants, key=lambda x: x["restaurant"]["id"]),
            sorted(self.restaurants, key=lambda x: x["restaurant"]["id"]),
        )
