"""I'm a module that contains unit tests for the Query root node."""
from graphene.test import Client


from ..src.data import setup
from ..src.schema import schema

setup()

client = Client(schema)


def test_hero_name_query(snapshot):
    query = """
        query HeroNameQuery {
            hero {
                name
            }
        }
    """
    snapshot.assert_match(client.execute(query))
