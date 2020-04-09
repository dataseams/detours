"""Main zomato object to get needed restaurant data from the zomato api."""
import requests
import json
from typing import List

from .config import ZOMATO_API_URL, ZOMATO_API_KEY


class Zomato:
    """Zomato api class."""

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
        self, q: str, lat=None, lon=None, city_ids=None, count=None
    ) -> List[dict]:
        """Get Zomato City ID and other details by name.

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

        return results
