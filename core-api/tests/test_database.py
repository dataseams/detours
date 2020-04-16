from unittest import TestCase

from core_api import database


class TestDatabase(TestCase):
    def test_init_db(self):
        database.init_db()
