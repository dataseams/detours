"""I'm a module that contains unit tests for the Query root node."""
from graphene.test import Client
from snapshottest import TestCase

from ..src.data import setup
from ..src.schema import schema

setup()


class TestCaseAPI(TestCase):
    """Add unit tests for API."""

    client = Client(schema)

    def test_hero_name_query(self):
        query = """
            query HeroNameQuery {
                hero {
                    name
                }
            }
        """
        self.assertMatchSnapshot(self.client.execute(query))

    def test_hero_name_and_friends_query(self):
        query = """
            query HeroNameAndFriendsQuery {
                hero {
                    id
                    name
                    friends {
                        name
                    }
                }
            }
        """
        self.assertMatchSnapshot(self.client.execute(query))

    def test_nested_query(self):
        query = """
            query NestedQuery {
                hero {
                    id
                    name
                    friends {
                        id
                        name
                        appearsIn
                        friends {
                            id
                            name
                        }
                    }
                }
            }
        """
        self.assertMatchSnapshot(self.client.execute(query))

    def test_fetch_luke_query(self):
        query = """
            query FetchLukeQuery {
                human(id: "1000") {
                    name
                }
            }
        """
        self.assertMatchSnapshot(self.client.execute(query))

    def test_fetch_some_id_query(self):
        query = """
            query FetchSomeIdQuery($someId: String!) {
                human(id: $someId) {
                    name
                }
            }
        """
        params = {"someId": "1000"}
        self.assertMatchSnapshot(self.client.execute(query, variables=params))

    def test_fetch_luke_aliased(self):
        query = """
            query FetchLukeAliased {
                luke: human(id: "1000") {
                    name
                }
            }
        """
        self.assertMatchSnapshot(self.client.execute(query))

    def test_fetch_luke_and_leia_aliased(self):
        query = """
            query FetchLukeAndLeiaAliased {
                luke: human(id: "1000") {
                    name
                }
                leia: human(id: "1003") {
                    name
                }
            }
        """
        self.assertMatchSnapshot(self.client.execute(query))

    def test_duplicate_fields(self):
        query = """
            query DuplicateFields {
                luke: human(id: "1000") {
                    name
                    homePlanet
                }
                leia: human(id: "1003") {
                    name
                    homePlanet
                }
            }
        """
        self.assertMatchSnapshot(self.client.execute(query))

    def test_use_fragment(self):
        query = """
            query UseFragment {
                luke: human(id: "1000") {
                    ...HumanFragment
                }
                leia: human(id: "1003") {
                    ...HumanFragment
                }
            }
            fragment HumanFragment on Human {
                name
                homePlanet
            }
        """
        self.assertMatchSnapshot(self.client.execute(query))

    def test_check_type_of_r2(self):
        query = """
            query CheckTypeOfR2 {
                hero {
                    __typename
                    name
                }
            }
        """
        self.assertMatchSnapshot(self.client.execute(query))

    def test_check_type_of_luke_in_episode(self):
        query = """
            query CheckTypeOfLuke {
                hery(episode: EMPIRE) {
                    __typename
                    name
                }
            }
        """
        self.assertMatchSnapshot(self.client.execute(query))
