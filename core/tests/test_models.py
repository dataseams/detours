from unittest import TestCase

from core.core_api import models


class TestModels(TestCase):
    def test_table_values_happy_path(self):
        table_values = models.TableValues(values={"morning": 1, "noon": 2})
        self.assertEqual(table_values.__getattribute__("morning"), 1)
        self.assertEqual(table_values.__getattribute__("noon"), 2)
        with self.assertRaises(AttributeError):
            table_values.__getattribute__("foo")
