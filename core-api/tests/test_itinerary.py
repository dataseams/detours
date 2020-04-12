from unittest import TestCase

from core_api.restaurant import itinerary


class TestItinerary(TestCase):
    def setUp(self):
        with open("tests/data/sample_survey_response.json", "r") as f:
            self.survey_response = f.read()

    def test_get_itinerary(self):
        # itinerary.get_restaurants(survey_response=self.survey_response)
        print("hello")
