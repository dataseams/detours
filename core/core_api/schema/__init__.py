"""
GrapphQL schema.

All model objects should be imported here otherwise the nodes won't work
as expected.
This is why you might see imported but unsued objects.

"""
from graphene import Boolean, Field, Int, List, ObjectType, Schema, String
from graphene_sqlalchemy import SQLAlchemyConnectionField

from .. import itinerary, models
from ..activities import Dining
from ..config import db_session
from ..utils import SurveyResponseID
from .activity import Activity
from .activity_type import ActivityType
from .city import City
from .daily_plan import DailyPlan
from .place import Place
from .plan_item import PlanItem
from .survey_response import (
    CreatePlanForSurveryResponse,
    SurveyResponse,
    UpdateTravelerEmailForSurveryResponse,
)
from .time_of_day import TimeOfDay
from .trip_plan import TripPlan, UserTripPlan, UserTripPlans


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
    get_survey_response_record = SQLAlchemyConnectionField(SurveyResponse)

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

    is_itinerary_saved = Field(lambda: Boolean, surveyResponseNodeId=String())

    def resolve_is_itinerary_saved(root, info, surveyResponseNodeId):
        """Check if there is a user email on survey response table by id.

        Return True if the survey response has a save user email on record,
        otherwise return False.
        """
        survey_response_id = int(
            base64.b64decode(surveyResponseNodeId)
            .decode("utf-8")
            .split(":")[-1]
        )
        query = SurveyResponse.get_query(info)
        survey_response = query.get(survey_response_id)
        traveler_email = survey_response.traveler_email
        result = True if traveler_email else False
        return result

    get_user_trip_plans = Field(UserTripPlans, travelerEmail=String())

    def resolve_get_user_trip_plans(root, info, travelerEmail):
        """Return all trip plans for a user."""
        survey_responses = (
            db_session.query(models.SurveyResponse)
            .filter_by(traveler_email=travelerEmail)
            .join(
                models.TripPlan,
                models.SurveyResponse.id == models.TripPlan.survey_response_id,
            )
            .join(models.City, models.City.id == models.TripPlan.city_id)
            .join(
                models.DailyPlan,
                models.DailyPlan.trip_plan_id == models.TripPlan.id,
            )
            .all()
        )

        trip_plans = (
            [
                UserTripPlan(
                    survey_response_id=SurveyResponseID.encode(
                        x.trip_plans[0].id
                    ),
                    city=x.trip_plans[0].city.name
                    + ", "
                    + x.trip_plans[0].city.state_abbr,
                    start_date=x.trip_plans[0].start_date,
                    end_date=x.trip_plans[0].end_date,
                    first_five_icons=[
                        z.activity.activity_type.material_icon
                        for y in x.trip_plans[0].daily_plans
                        for z in y.plan_items
                    ][:5],
                )
                for x in survey_responses
            ]
            if survey_responses
            else []
        )
        user_trip_plans = UserTripPlans(data=trip_plans)

        return user_trip_plans


schema = Schema(query=Query, mutation=Mutation)
