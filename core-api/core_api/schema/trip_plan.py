"""TripPlan schema."""
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType

from .. import models


class TripPlan(SQLAlchemyObjectType):
    """Trip entity."""

    class Meta:
        """Meta class."""

        model = models.TripPlan
        exclude_fields = (
            "city_id",
            "traveler_id",
            "start_time",
            "end_time",
            "survey_response_id",
        )
        interfaces = (relay.Node,)
