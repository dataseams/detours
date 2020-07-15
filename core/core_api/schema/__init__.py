"""
GrapphQL schema.

All model objects should be imported here otherwise the nodes won't work
as expected.
This is why you might see imported but unsued objects.

"""
import base64

from graphene import ObjectType, String, Schema, Int, Field
from graphene_sqlalchemy import SQLAlchemyConnectionField

from .time_of_day import TimeOfDay
from .city import City
from .survey_response import (
    SurveyResponse,
    CreatePlanForSurveryResponse,
    UpdateTravelerEmailForSurveryResponse,
)
from .trip_plan import TripPlan
from .daily_plan import DailyPlan
from .plan_item import PlanItem
from .activity import Activity
from .activity_type import ActivityType
from .place import Place
from .. import models
from ..restaurant import itinerary as restaurant_itinerary
from .. import itinerary


class Mutation(ObjectType):
    """Update database entities."""

    create_plan_for_survey_response = CreatePlanForSurveryResponse.Field()
    update_traveler_email_for_survey_response = (
        UpdateTravelerEmailForSurveryResponse.Field()
    )


class Query(ObjectType):
    """Graphene root query node."""

    get_all_trips = SQLAlchemyConnectionField(TripPlan)
    get_all_cities = SQLAlchemyConnectionField(City, sort=City.sort_argument())
    get_all_activities = SQLAlchemyConnectionField(Activity)
    get_all_activity_types = SQLAlchemyConnectionField(ActivityType)
    get_all_places = SQLAlchemyConnectionField(Place)
    get_all_survey_responses = SQLAlchemyConnectionField(SurveyResponse)

    hello = String(surveyResponseNodeId=Int())
    goodbye = String()

    def resolve_hello(root, info, surveyResponseNodeId):
        """Greet on entry."""
        # Create itinerary
        survey_response_query = SurveyResponse.get_query(info)
        survey_response_obj = survey_response_query.get(surveyResponseNodeId)
        survey_response_json = survey_response_obj.json

        restaurants = restaurant_itinerary.get_restaurants(
            survey_response_json
        )
        itinerary.store_activities(restaurants, surveyResponseNodeId)

        return f"Hello {surveyResponseNodeId}"

    def resolve_goodbye(root, info):
        """Greet on exit."""
        return "See ya!"

    get_last_trip_plan_for_survey_response = Field(
        lambda: TripPlan, surveyResponseNodeId=String()
    )

    def resolve_get_last_trip_plan_for_survey_response(
        root, info, surveyResponseNodeId
    ):
        """Query trip plan by survey response id."""
        survey_response_id = int(
            base64.b64decode(surveyResponseNodeId)
            .decode("utf-8")
            .split(":")[-1]
        )

        query = TripPlan.get_query(info)
        trip_plans = (
            query.filter(
                models.TripPlan.survey_response_id == survey_response_id
            )
            .order_by(models.TripPlan.time_stamp.desc())
            .first()
        )

        return trip_plans


schema = Schema(query=Query, mutation=Mutation)
