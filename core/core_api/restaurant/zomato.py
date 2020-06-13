"""Main zomato object to get needed restaurant data from the zomato api."""
import requests
from typing import List, Optional
from warnings import warn
import math

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
    CITY_IDS = {
        "Los Angeles": "281",
        "San Francisco": "306",
        "New York": "280",
        "Chicago": "292",
        "San Diego": "302",
    }

    def __init__(
        self, api_url: str = ZOMATO_API_URL, api_key: str = ZOMATO_API_KEY
    ):
        self.url = api_url
        self.key = api_key
        self.headers = {"user-key": self.key, "Accept": "application/json"}
        self.endpoints = {
            "categories": "categories",
            "cities": "cities",
            "categories": "categories",
            "collections": "collections",
            "cuisines": "cuisines",
            "establishments": "establishments",
            "geocode": "geocode",
            "location_details": "location_details",
            "locations": "locations",
            "dailymenu": "dailymenu",
            "restaurant": "restaurant",
            "reviews": "reviews",
            "search": "search",
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
        results = results.json()["location_suggestions"]
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

    def search(
        self,
        entity_id: Optional[int] = None,
        entity_type: Optional[str] = None,
        q: Optional[str] = None,
        start: Optional[int] = None,
        count: Optional[int] = None,
        lat: Optional[float] = None,
        lon: Optional[float] = None,
        radius: Optional[float] = None,
        cuisines: Optional[str] = None,
        establishment_type: Optional[str] = None,
        collection_id: Optional[str] = None,
        category: Optional[str] = None,
        sort: Optional[str] = None,
        order: Optional[str] = None,
    ):
        """Call zomato's search endpoint.

        Parameters
        ----------
        entity_id: int
            Location id.
        entity_type: str
            Location type.
            One of 'city', 'subzone', 'zone', 'landmark', 'metro', 'group'.
        q: str
            Search keyword.
        start: int
            Fetch results after offset.
        count: int
            Max number of results to display. Up to 20.
        lat: float
            Latitude.
        lon: float
            Longitude.
        radius: float
            Radius around (lat,lon); to define search area, in meters(M).
        cuisines: str
            List of cuisine id's separated by comma.
        establishment_type: str
            Estblishment id obtained from establishments call.
        collection_id: str
            Collection id obtained from collections call.
        category: str
            Category ids obtained from categories call.
        sort: str
            One of 'cost', 'rating', or 'real_distance'.
        order: str
            One of 'asc' or 'desc'.

        Returns
        -------
        res: list[dict]
            List of restaurants matching the input parmaters.

        """
        endpoint = self.endpoints["search"]
        params = {}
        if entity_id:
            params["entity_id"] = entity_id
        if entity_type:
            params["entity_type"] = entity_type
        if q:
            params["q"] = q
        if start:
            params["start"] = start
        if count:
            params["count"] = count
        if lat:
            params["lat"] = lat
        if lon:
            params["lon"] = lon
        if radius:
            params["radius"] = radius
        if cuisines:
            params["cuisines"] = cuisines
        if establishment_type:
            params["establishment_type"] = establishment_type
        if collection_id:
            params["collection_id"] = collection_id
        if category:
            params["category"] = category
        if sort:
            params["sort"] = sort
        if order:
            params["order"] = order

        request_url = f"{self.url}/{endpoint}"

        response = requests.get(
            request_url, params=params, headers=self.headers
        )

        results = response.json()
        restaurants = results["restaurants"]

        return restaurants

    def search_(
        self,
        entity_id: int,
        entity_type: str,
        cuisines: str,
        establishment_type: str,
        count: int,
    ):
        """Search for `count` restaurants in zomato's api. Count up to 100."""
        batch_size = 20
        n_batches = math.ceil(count / batch_size)
        restaurants = []
        for i in range(n_batches):
            start = i * batch_size
            restaurants_batch = self.search(
                entity_id=entity_id,
                entity_type=entity_type,
                cuisines=None,
                establishment_type=None,
                start=start,
                count=batch_size,
            )
            restaurants.extend(restaurants_batch)
        return restaurants
