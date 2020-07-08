"""Set package-wise configuration variables in this module."""
import os

GOOGLE_MAPS_API_KEY = os.environ.get("GOOGLE_MAPS_API_KEY")
GOOGLE_MAPS_API_URL = (
    "https://maps.googleapis.com/maps/api/place/findplacefromtext"
)
