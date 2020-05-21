"""PlanItem` schema."""
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType

from .. import models


class PlanItem(SQLAlchemyObjectType):
    """ItineraryItem entity."""

    class Meta:
        """Meta class."""

        model = models.PlanItem
        exclude_fields = ("daily_plan_id", "activity_id")
        interfaces = (relay.Node,)
