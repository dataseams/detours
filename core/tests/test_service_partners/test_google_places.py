from unittest import TestCase

from core_api.service_partners.google_places import Client
from core_api.activites import Biking


class TestGooglePlaces(TestCase):
    def test_client_happy_path(self):
        places = Client()
        # bicycle_rentals = places.search(query="Bicycle rental")
        # self.assertIsNotNone(bicycle_rentals)


class TestGetActivities(TestCase):
    def test_happy_path(self):
        survey_response = (
            '{"city": "LA" , "arrivalDate": "2020-01-01", '
            '"returnDate": "2020-01-02"}'
        )
        activities = Biking(survey_response).get()
        self.assertIsInstance(activities, list)
        self.assertEqual(len(activities), 1)
