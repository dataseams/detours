from unittest import TestCase

from restaurant_api.zomato import Zomato


class TestZomato:
    """Zomato class unit tests."""

    def test_happy_path(TestCase):
        zomato = Zomato()
        cities = zomato.get_cities(q="Los Angeles", city_ids=[281])
        print("zomato")
