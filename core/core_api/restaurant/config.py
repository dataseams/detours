"""Set package-wise configuration variables in this module."""
import os

ZOMATO_API_KEY = os.environ.get("ZOMATO_API_KEY")
ZOMATO_API_URL = os.environ.get(
    "ZOMATO_API_URL", "https://developers.zomato.com/api/v2.1"
)
