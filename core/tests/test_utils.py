from typing import Text
from unittest import TestCase
from core_api import utils


class TextItineraryTag(TestCase):
    def test_format_dining_happy_path(self):
        tag = "Hole-in-the-wall"
        formatted_tag = utils.ItineraryTag.format_dining(tag)
        self.assertEqual(formatted_tag, "Hole-in-the-wall dining")

    def test_format_dining_with_spaces(self):
        tag = " Casual and everyday "
        formatted_tag = utils.ItineraryTag.format_dining(tag)
        self.assertEqual(formatted_tag, "Casual and everyday dining")

    def test_format_dining_with_dining_suffix(self):
        tag = "Fine dining"
        formatted_tag = utils.ItineraryTag.format_dining(tag)
        self.assertEqual(formatted_tag, "Fine dining")

    def test_format_dining_with_lower_case(self):
        tag = "where locals hang"
        formatted_tag = utils.ItineraryTag.format_dining(tag)
        self.assertEqual(formatted_tag, "Where locals hang dining")
