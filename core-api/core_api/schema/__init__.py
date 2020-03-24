"""GrapphQL schema."""
import graphene
from graphene_sqlalchemy import SQLAlchemyConnectionField

from .city import City
from .traveler import Traveler, AddTraveler
from .trip_plan import TripPlan
from .daily_plan import DailyPlan
from .plan_item import PlanItem
from .activity import Activity
from .survey_response import AddSurveryResponse


class Mutation(graphene.ObjectType):
    """Update database entities."""

    add_traveler = AddTraveler.Field()
    add_survey_response = AddSurveryResponse.Field()


class Query(graphene.ObjectType):
    """Graphene root query node."""

    get_all_trips = SQLAlchemyConnectionField(TripPlan)
    get_all_cities = SQLAlchemyConnectionField(City, sort=City.sort_argument())
    get_all_travelers = SQLAlchemyConnectionField(Traveler)
    get_all_activities = SQLAlchemyConnectionField(Activity)


schema = graphene.Schema(query=Query, mutation=Mutation)
