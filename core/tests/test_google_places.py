from unittest import TestCase

from core_api.activity import googe_places


class TestGooglePlaces(TestCase):
    def test_client_happy_path(self):
        places = googe_places.Client()
        # bicycle_rentals = places.find(query="Bicycle rental")
        # self.assertIsNotNone(bicycle_rentals)
