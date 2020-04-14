from unittest import TestCase
from unittest.mock import Mock, patch, MagicMock
import os

from core_api.restaurant.zomato import Zomato


class TestZomato(TestCase):
    """Zomato class unit tests."""

    def setUp(self):
        tests_dir = os.path.dirname(__file__)
        cities_file_path = os.path.join(tests_dir, "data/cities.json")
        with open(cities_file_path, "r") as f:
            self.cities_response = f.read()

    @patch("requests.get")
    def test_get_cities_happy_path(self, requests_get_mock):
        requests_response = Mock()
        requests_response.text = self.cities_response
        requests_get_mock.return_value = requests_response
        zomato = Zomato()
        cities = zomato.get_cities(q="Los Angeles")
        self.assertEqual(len(cities), 8)

    def test_get_city_happy_path(self):
        zomato = Zomato()
        city_name = "Los Angeles"
        cities = [
            {
                "id": 281,
                "name": "Los Angeles, CA",
                "state_name": "California",
                "country_name": "United States",
                "is_state": 0,
                "discovery_enabled": 1,
            }
        ]
        zomato.get_cities = Mock(return_value=cities)
        city = zomato.get_city(**zomato.CITY_FILTERS[city_name])
        zomato.get_cities.assert_called_once_with(
            q=zomato.CITY_FILTERS[city_name]["city_name"]
        )
        self.assertIsInstance(city, dict)
        self.assertIn("id", city)
        self.assertEqual(city["id"], 281)

    def test_get_city_id_happy_path(self):
        city_name = "Los Angeles"
        zomato = Zomato()
        zomato.get_city = Mock(return_value={"id": 281})
        city_id = zomato.get_city_id(city_name=city_name)
        zomato.get_city.assert_called_once_with(
            **zomato.CITY_FILTERS[city_name]
        )
        self.assertEqual(city_id, 281)

    def test_search(self):
        zomato = Zomato()
        zomato.search = Mock(return_value=["restaurants"])
        res = zomato.search(
            entity_id=281, q="Lebanese", sort="rating", order="desc"
        )
        self.assertEqual(res, ["restaurants"])
