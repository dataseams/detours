from unittest import TestCase
from unittest.mock import patch, Mock
import os
import json

from core.core_api import activities


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

    @patch("core.core_api.service_partners.zomato.Client.search_")
    def test_get_restaurants_happy_path(self, zomato_search_mock):
        zomato_search_mock.return_value = self.restaurants
        restaurants = activities.Dining(self.survey_response).get()
        self.assertEqual(
            sorted(restaurants, key=lambda x: x["restaurant"]["id"]),
            sorted(self.restaurants, key=lambda x: x["restaurant"]["id"]),
        )
