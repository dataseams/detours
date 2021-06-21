from typing import Text
from unittest import TestCase

from core_api import utils


class TestItineraryTag(TestCase):
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


class TestSurveyResponseID(TestCase):
    def test_encode_happy_path(self):
        int_id = 1
        expected_b64_id = "U3VydmV5UmVzcG9uc2U6MQ=="
        b64_id = utils.SurveyResponseID.encode(int_id)
        self.assertEqual(b64_id, expected_b64_id)

    def test_decode_happy_path(self):
        b64_id = "U3VydmV5UmVzcG9uc2U6MQ=="
        int_id = utils.SurveyResponseID.decode(b64_id)
        expected_int_id = 1
        self.assertEqual(int_id, expected_int_id)

    def test_decode_from_binary(self):
        b64_id = b"U3VydmV5UmVzcG9uc2U6MQ=="
        int_id = utils.SurveyResponseID.decode(b64_id)
        expected_int_id = 1
        self.assertEqual(int_id, expected_int_id)
