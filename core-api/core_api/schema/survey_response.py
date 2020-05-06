"""SurveyResponse schema."""
from graphene import Mutation, Field, String, Int, JSONString
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType
from graphql_relay.node.node import from_global_id

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

        return CreatePlanForSurveryResponse(survey_response=survey_response)


class UpdateTravelerEmailForSurveryResponse(Mutation):
    """Create mutation to update traveler email on for survey response."""

    survey_response_traveler = Field(
        lambda: SurveyResponse,
        description="Survey response record updated by this mutationz.",
    )

    class Arguments:
        """Declare input arguments."""

        survey_response_id = String(
            required=True,
            description="The global ID of a previously saved survey response.",
        )

        traveler_email = String(
            required=True, description="The traveler email from Firebase auth."
        )

    def mutate(self, info, survey_response_id, traveler_email, json):
        """Add survey answers to the database."""
        local_survey_response_id = from_global_id(survey_response_id)[0]
        survey_response = models.SurveyResponse(
            id=local_survey_response_id, traveler_email=traveler_email
        )
        db_session.add(survey_response)
        db_session.commit()

        return UpdateTravelerEmailForSurveryResponse(
            survey_response_traveler=survey_response
        )
