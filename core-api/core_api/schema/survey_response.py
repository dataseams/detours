"""SurveyResponse schema."""
from graphene import Mutation, Field, Int, JSONString
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType

from .. import models
from ..config import db_session


class SurveyResponse(SQLAlchemyObjectType):
    """SurveyResult entity."""

    class Meta:
        """Meta class."""

        model = models.SurveyResponse
        exclude_fields = "traveler_id"
        interfaces = (relay.Node,)


class AddSurveryResponse(Mutation):
    """Create mutation to add a new traveler."""

    survey_response = Field(
        lambda: SurveyResponse,
        description="Survey answers created by this mutation.",
    )

    class Arguments:
        """Declare input arguments."""

        traveler_id = Int(
            required=True, description="The traveler id in the database."
        )
        json = JSONString(required=True, description="The survey answers.")

    def mutate(self, info, traveler_id, json):
        """Add survey answers to the database."""
        survey_response = models.SurveyResponse(
            traveler_id=traveler_id, json=json
        )
        db_session.add(survey_response)
        db_session.commit()

        return AddSurveryResponse(survey_response=survey_response)
