"""Main Google Places object to get activities from the api."""
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
        self.key = api_key
        self.headers = {"Accept": "application/json"}
        self.output = "json"

    def search(
        self, query: str, input_type: str = "textquery", language: str = "en"
    ) -> dict:
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
        dict
            Response object containins the search results as a list of places
        """
        fields = "formatted_address,name,rating,geometry"
        params = {}
        params["key"] = self.key
        params["input"] = query
        params["inputtype"] = input_type
        params["language"] = language
        params["fields"] = fields

        request_url = f"{self.url}/{self.output}"

        response = requests.get(
            request_url, params=params, headers=self.headers
        )

        results = response.json()["candidates"]

        return results
