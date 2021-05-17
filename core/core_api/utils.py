"""Utility logic."""
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
