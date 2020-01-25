"""GraphQL schema module."""
import graphene

from .data import get_character, get_droid, get_hero, get_human


class Episode(graphene.Enum):
    """Add Episode enum."""

    NEWHOPE = 4
    EMPIRE = 5
    JEDI = 6


class Character(graphene.Interface):
    """Add character attributes."""

    id = graphene.ID()
    name = graphene.String()
    friends = graphene.List(lambda: Character)
    appears_in = graphene.List(Episode)

    def resolve_friends(self, info):
        """Add friends of character."""
        return [get_character(f) for f in self.friends]


class Human(graphene.ObjectType):
    """Add human."""

    class Meta:
        """Add character meta."""

        interfaces = (Character,)

    home_planet = graphene.String()


class Droid(graphene.ObjectType):
    """Add droid."""

    class Meta:
        """Add character meta."""

        interfaces = (Character,)

    primary_function = graphene.String()


class Query(graphene.ObjectType):
    """Add object type."""

    hero = graphene.Field(Character, episode=Episode())
    human = graphene.Field(Human, id=graphene.String())
    droid = graphene.Field(Droid, id=graphene.String())

    def resolve_hero(self, info, episode=None):
        """Add hero resolver."""
        return get_hero(episode)

    def resolve_human(self, info, id):
        """Add human resolver."""
        return get_human(id)

    def resolve_droid(self, info, id):
        """Add droid resolver."""
        return get_droid(id)


schema = graphene.Schema(query=Query)
