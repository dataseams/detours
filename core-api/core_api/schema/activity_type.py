"""ActivityType schema."""
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType

from .. import models


class ActivityType(SQLAlchemyObjectType):
    """ActivityType entity."""

    class Meta:
        """Meta class."""

        model = models.ActivityType
        interfaces = (relay.Node,)
