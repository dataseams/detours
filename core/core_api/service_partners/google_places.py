"""Main Google Places object to get activities from the api."""
from typing import List

import requests

from .config import GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_API_URL


class Client:
    """Google places api class."""

    def __init__(
        self,
        api_url: str = GOOGLE_MAPS_API_URL,
        api_key: str = GOOGLE_MAPS_API_KEY,
    ):
        self.url = api_url
        self.url_search_nearby = api_url + "/" + "nearbysearch"
        self.url_details = api_url + "/" + "details"
        self.key = api_key
        self.headers = {"Accept": "application/json"}
        self.output = "json"

    def search(
        self, query: str, input_type: str = "textquery", language: str = "en"
    ) -> List[dict]:
        """Make an API call to Google Places with a search query.

        Parameters
        ----------
        query : str
            Activity and city to query for
        input_type : str, optional
            Textquery or phonenumber, by default "textquery"
        language : str, optional
            Natural language, by default "en"

        Returns
        -------
        List[dict]
            Response object containins the search results as a list of places
        """
        fields = "formatted_address,name,rating,geometry"
        params = {}
        params["key"] = self.key
        params["input"] = query
        params["inputtype"] = input_type
        params["language"] = language
        params["fields"] = fields

        request_url = f"{self.self.url_search_nearby}/{self.output}"

        response = requests.get(
            request_url, params=params, headers=self.headers
        )

        results = response.json()["candidates"]

        return results

    def search_nearby(
        self,
        query: str,
        location: str,
        radius: int = 10000,
        language: str = "en",
    ) -> List[dict]:
        """Make an API call to Google Places with a search query.

        Parameters
        ----------
        query : str
            Activity and city to query for
        input_type : str, optional
            Textquery or phonenumber, by default "textquery"
        language : str, optional
            Natural language, by default "en"

        Returns
        -------
        List[dict]
            Response object containins the search results as a list of places
        """
        params = {}
        params["key"] = self.key
        params["keyword"] = query
        params["language"] = language
        params["location"] = location
        params["radius"] = radius

        request_url = f"{self.url_search_nearby}/{self.output}"

        response = requests.get(
            request_url, params=params, headers=self.headers
        )

        results = response.json()["results"]

        return results

    def place_details(self, place_id: str) ->list:
        """Get place details.

        Parameters
        ----------
        place_id : str
            Google place id

        Returns
        -------
        dict
            place details returned
        """
        params = {}
        params["key"] = self.key
        params["place_id"] = place_id

        request_url = f"{self.url_details}/{self.output}"

        response = requests.get(
            request_url, params=params, headers=self.headers
        )

        results = response.json()["result"]

        return results
