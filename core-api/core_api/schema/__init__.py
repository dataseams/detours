"""
GrapphQL schema.

All model objects should be imported here otherwise the nodes won't work
as expected.
This is why you might see imported but unsued objects.

"""
import graphene
from graphene_sqlalchemy import SQLAlchemyConnectionField

from .city import City
from .traveler import Traveler, AddTraveler
from .trip_plan import TripPlan
from .daily_plan import DailyPlan
from .plan_item import PlanItem
from .activity import Activity
from .survey_response import AddSurveryResponse
from .activity_type import ActivityType
from .place import Place


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
    get_all_activity_types = SQLAlchemyConnectionField(ActivityType)
    get_all_places = SQLAlchemyConnectionField(Place)


schema = graphene.Schema(query=Query, mutation=Mutation)
