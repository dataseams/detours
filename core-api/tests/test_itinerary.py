from unittest import TestCase
import os

from core_api.restaurant import itinerary


class TestItinerary(TestCase):
    def setUp(self):
        tests_dir = os.path.dirname(__file__)
        survey_response_path = os.path.join(
            tests_dir, "data/sample_survey_response.json"
        )
        with open(survey_response_path, "r") as f:
            self.survey_response = f.read()

    def test_get_itinerary(self):
        restaurants = itinerary.get_restaurants(
            survey_response=self.survey_response
        )
        print(restaurants)
