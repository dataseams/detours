"""DailyPlan schema."""
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType

from .. import models


class DailyPlan(SQLAlchemyObjectType):
    """TripDay entity."""

    class Meta:
        """Meta class."""

        model = models.DailyPlan
        exclude_fields = "trip_plan_id"
        interfaces = (relay.Node,)
