from unittest import TestCase
from unittest.mock import Mock, patch
import pytest

from core_api.service_partners.google_places import Client
from core_api.activities import Biking


class TestGooglePlaces(TestCase):
    def test_client_happy_path(self):
        places = Client()
        self.assertIsNotNone(places)


class TestGetActivities(TestCase):
    @patch("core_api.activities.google_places")
    def test_happy_path(self, mock_google_places):
        survey_response = (
            '{"city": "LA" , "travelDates": ["2020-01-01", "2020-01-02"]}'
        )
        client_object = Mock()
        mock_google_places.Client.return_value = client_object
        expected_activities = [dict(), dict()]
        client_object.search.return_value = expected_activities
        activities = Biking(survey_response).get()
        mock_google_places.Client.assert_called_once()
        client_object.search.assert_called_once_with(
            query="bicycle rental in Los Angeles California"
        )
        self.assertIsInstance(activities, list)
        self.assertEqual(len(activities), 1)
        self.assertIn("activity_type", activities[0].keys())
