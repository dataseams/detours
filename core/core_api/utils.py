"""Utility logic."""
import re


class StringCasing:
    """Manipulate string casing."""

    @staticmethod
    def camel_to_proper_spaced(text: str) -> str:
        """Convert camel cased text to proper casing spaced text.

        Parameters
        ----------
        text : str
            Text to transform
            i.e. holeInTheWall

        Returns
        -------
        str
            Transformed text
            i.e. Hole in the wall
        """
        transformed_text = re.sub(
            "([a-z])([A-Z])", "\g<1> \g<2>", text
        ).lower().capitalize()
        return transformed_text
