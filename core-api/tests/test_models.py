from unittest import TestCase

from core_api import models


class TestModels(TestCase):
    def test_happy_path(self):
        table_values = models.TableValues(values={"morning": 1, "noon": 2})
        print("1")
