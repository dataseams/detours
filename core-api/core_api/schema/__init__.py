"""
GrapphQL schema.

All model objects should be imported here otherwise the nodes won't work
as expected.
This is why you might see imported but unsued objects.

"""
from graphene import ObjectType, String, Schema, Int, List
from graphene_sqlalchemy import SQLAlchemyConnectionField

from .time_of_day import TimeOfDay
from .city import City
from .traveler import Traveler, AddTraveler
from .survey_response import SurveyResponse, AddSurveryResponse
from .trip_plan import TripPlan
from .daily_plan import DailyPlan
from .plan_item import PlanItem
from .activity import Activity
from .activity_type import ActivityType
from .place import Place
from .. import models


class Mutation(ObjectType):
    """Update database entities."""

    add_traveler = AddTraveler.Field()
    add_survey_response = AddSurveryResponse.Field()


class Query(ObjectType):
    """Graphene root query node."""

    get_all_trips = SQLAlchemyConnectionField(TripPlan)
    get_all_cities = SQLAlchemyConnectionField(City, sort=City.sort_argument())
    get_all_travelers = SQLAlchemyConnectionField(Traveler)
    get_all_activities = SQLAlchemyConnectionField(Activity)
    get_all_activity_types = SQLAlchemyConnectionField(ActivityType)
    get_all_places = SQLAlchemyConnectionField(Place)
    get_all_survey_responses = SQLAlchemyConnectionField(SurveyResponse)

    hello = String(name=String(default_value="Stranger"))
    goodbye = String()

    def resolve_hello(root, info, name):
        """Greet on entry."""
        return f"Hello {name}"

    def resolve_goodbye(root, info):
        """Greet on exit."""
        return "See ya!"

    last_trip_plan_for_survey_response = List(
        lambda: TripPlan, surveyResponseId=Int()
    )

    def resolve_last_trip_plan_for_survey_response(
        root, info, surveyResponseId
    ):
        """Query trip plan by survey response id."""
        query = TripPlan.get_query(info)
        trip_plans = query.filter(
            models.TripPlan.survey_response_id == surveyResponseId
        )
        return trip_plans


schema = Schema(query=Query, mutation=Mutation)
