"""SurveyResponse schema."""
from graphene import Mutation, Field, String, JSONString
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType

from .. import models
from ..config import db_session
from ..restaurant import itinerary


class SurveyResponse(SQLAlchemyObjectType):
    """SurveyResult entity."""

    class Meta:
        """Meta class."""

        model = models.SurveyResponse
        interfaces = (relay.Node,)


class CreatePlanForSurveryResponse(Mutation):
    """Create mutation to add a new survey response."""

    survey_response = Field(
        lambda: SurveyResponse,
        description="Survey answers created by this mutation.",
    )

    class Arguments:
        """Declare input arguments."""

        traveler_email = String(
            required=True, description="The traveler email from Firebase auth."
        )
        json = JSONString(required=True, description="The survey answers.")

    def mutate(self, info, traveler_email, json):
        """Add survey answers to the database."""
        survey_response = models.SurveyResponse(
            traveler_email=traveler_email, json=json
        )
        db_session.add(survey_response)
        db_session.commit()

        survey_response_query = SurveyResponse.get_query(info)
        survey_response_obj = survey_response_query.get(survey_response.id)
        survey_response_json = survey_response_obj.json

        restaurants = itinerary.get_restaurants(survey_response_json)
        itinerary.store_restaurants(restaurants, survey_response.id)

        return CreatePlanForSurveryResponse(
            survey_response=survey_response
        )
