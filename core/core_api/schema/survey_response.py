"""SurveyResponse schema."""
from graphene import Mutation, Field, String, JSONString
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType
from graphql_relay.node.node import from_global_id

from .. import models
from ..config import db_session
from .. import itinerary


class SurveyResponse(SQLAlchemyObjectType):
    """SurveyResult entity."""

    class Meta:
        """Meta class."""

        model = models.SurveyResponse
        interfaces = (relay.Node,)


class CreatePlanForSurveryResponse(Mutation):
    """Create a new survey response."""

    survey_response = Field(
        lambda: SurveyResponse,
        description="Survey response record created by this mutation.",
    )

    class Arguments:
        """Declare input arguments."""

        traveler_email = String(
            required=True, description="The traveler email from Firebase auth."
        )
        json = JSONString(required=True, description="The survey answers.")

    def mutate(self, info, traveler_email, json):
        """Add survey response record to the database."""
        survey_response = models.SurveyResponse(
            traveler_email=traveler_email, json=json
        )
        db_session.add(survey_response)
        db_session.commit()

        survey_response_query = SurveyResponse.get_query(info)
        survey_response_obj = survey_response_query.get(survey_response.id)
        survey_response_json = survey_response_obj.json

        itinerary_items = itinerary.build_itinerary(survey_response_json)
        itinerary.save_itinerary(
            itinerary_items=itinerary_items,
            city_code=survey_response_json["city"],
            survey_response_id=survey_response.id,
            survey_response=survey_response.json,
        )

        return CreatePlanForSurveryResponse(survey_response=survey_response)


class UpdateTravelerEmailForSurveryResponse(Mutation):
    """Update traveler email on for survey response."""

    survey_response = Field(
        lambda: SurveyResponse,
        description="Survey response record updated by this mutation.",
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

    def mutate(self, info, survey_response_id, traveler_email):
        """Update traveler email for survey response record in the database."""
        local_survey_response_id = int(from_global_id(survey_response_id)[1])
        survey_response = db_session.query(models.SurveyResponse).filter_by(
            id=local_survey_response_id
        )
        survey_response.update({"traveler_email": traveler_email})
        db_session.commit()
        survey_response = (
            db_session.query(models.SurveyResponse).filter_by(
                id=local_survey_response_id
            )
        ).first()

        return UpdateTravelerEmailForSurveryResponse(
            survey_response=survey_response
        )
