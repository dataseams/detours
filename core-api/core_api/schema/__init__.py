"""GrapphQL schema."""
import graphene
from graphene_sqlalchemy import SQLAlchemyConnectionField

from .city import City
from .traveler import Traveler, AddTraveler
from .trip_plan import TripPlan
from .survey_response import AddSurveryResponse


class Mutation(graphene.ObjectType):
    """Update database entities."""

    add_traveler = AddTraveler.Field()
    add_survey_respons = AddSurveryResponse.Field()


class Query(graphene.ObjectType):
    """Graphene root query node."""

    # Allow only single column sorting
    get_all_trips = SQLAlchemyConnectionField(TripPlan)
    # Allow sorting over multiple columns, by default over the primary key
    get_all_cities = SQLAlchemyConnectionField(City, sort=City.sort_argument())
    get_all_travelers = SQLAlchemyConnectionField(Traveler)


schema = graphene.Schema(query=Query, mutation=Mutation)
