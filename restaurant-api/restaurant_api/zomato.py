"""Main zomato object to get needed restaurant data from the zomato api."""
import requests
import json
from typing import List, Optional
from warnings import warn

from .config import ZOMATO_API_URL, ZOMATO_API_KEY


class Zomato:
    """Zomato api class."""

    CITY_FILTERS = {
        "Los Angeles": {
            "city_name": "Los Angeles, CA",
            "state_name": "California",
            "country_name": "United States",
            "is_state": 0,
            "discovery_enabled": 1,
        }
    }
    CITY_IDS = {"Los Angeles": "281"}

    def __init__(
        self, api_url: str = ZOMATO_API_URL, api_key: str = ZOMATO_API_KEY
    ):
        self.url = api_url
        self.key = api_key
        self.headers = {"user-key": self.key, "Accept": "application/json"}
        self.endpoints = {
            "categories": "/categories",
            "cities": "/cities",
            "categories": "/categories",
            "collections": "/collections",
            "cuisines": "/cuisines",
            "establishments": "/establishments",
            "geocode": "/geocode",
            "location_details": "/location_details",
            "locations": "/locations",
            "dailymenu": "/dailymenu",
            "restaurant": "/restaurant",
            "reviews": "/reviews",
            "search": "/search",
        }

    def get_cities(
        self,
        q: str,
        lat: float = None,
        lon: float = None,
        city_ids: Optional[List[int]] = None,
        count: int = None,
    ) -> List[dict]:
        """Call zomato's cities endpoint.

        Parameters
        ----------
        q: str
            Name of the city to search for.

        Returns
        -------
        results: list[dict]
            List of cities matching the input parmaters.

        """
        endpoint = self.endpoints["cities"]
        params = f"q={q}"
        if lat:
            params += f"&lat={lat}"
        if lon:
            params += f"&lon={lon}"
        if city_ids:
            params += f"&city_ids={city_ids}"
        if count:
            params += f"&count={count}"
        request_url = self.url + endpoint + "?" + params

        results = requests.get(request_url, headers=self.headers)
        results = json.loads(results.text)["location_suggestions"]
        city = [x for x in results]

        return city

    def get_city(
        self,
        city_name: str,
        state_name: str,
        country_name: str,
        is_state: int,
        discovery_enabled: int,
    ) -> dict:
        """Get Zomato City ID and other details by name.

        Parameters
        ----------
        city_name: str
            Name of the city to search for.

        Returns
        -------
        results: list[dict]
            List of cities matching the input parmaters.

        """
        cities = self.get_cities(q=city_name)
        city = [
            x
            for x in cities
            if x["country_name"] == country_name
            and x["state_name"] == state_name
            and x["name"] == city_name
            and x["is_state"] == is_state
            and x["discovery_enabled"] == discovery_enabled
        ]
        if len(city) > 1:
            warn(
                f"Multiple cities returned for {city_name} from Zomato API. "
                f"The first city in the list will be returned."
            )

        return city[0]

    def get_city_id(self, city_name: str):
        """Get zomato city id by name."""
        kwargs = self.CITY_FILTERS[city_name]
        return self.get_city(**kwargs)["id"]
