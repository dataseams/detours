"""Utility logic."""
import base64
import re


class ItineraryTag:
    """Format itinerary summary tags."""

    @staticmethod
    def format_dining(text: str) -> str:
        """Format dining tags on the itinerary summary and add dining suffix.

        Parameters
        ----------
        text : str
            Tag text to format
            i.e. Hole-in-the-wall

        Returns
        -------
        str
            Formatted text
            i.e. Hole-in-the-wall dining
        """
        text_wo_dining = re.sub(r"dining$", "", text.lower()).strip()
        formatted_text = f"{text_wo_dining} dining".capitalize()
        return formatted_text


class SurveyResponseID:
    """Survey Response ID encode/decode."""

    @staticmethod
    def decode(id: str):
        """Decode and extract integer survey response id from base64 encoding.

        Parameters
        ----------
        id: str
            Base64 encoded survey response id in the text form of
            SurveyResponse:`int_id`. Example: SurveyResponse:1

        Returns
        -------
        int
            Integer survey response id
        """
        return int(
            base64.b64decode(id.encode("utf-8")).decode("utf-8").split(":")[1]
        )

    @staticmethod
    def encode(id: int):
        """Construct and encode integer survey response id.

        Parameters
        ----------
        id: str
            Integer survey response id

        Returns
        -------
        int
            Base64 encoded survey response id in the text form of
            SurveyResponse:`int_id`. Example: SurveyResponse:1
        """
        return base64.b64encode(f"SurveyResponse:{id}".encode("utf-8")).decode(
            "utf-8"
        )
