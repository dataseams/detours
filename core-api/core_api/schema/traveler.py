"""Traveler schema."""
import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType

from .. import models
from ..config import db_session


class Traveler(SQLAlchemyObjectType):
    """Traveler entity."""

    class Meta:
        """Meta data."""

        model = models.Traveler
        interfaces = (relay.Node,)


class AddTraveler(graphene.Mutation):
    """Create mutation to add a new traveler."""

    traveler = graphene.Field(
        lambda: Traveler, description="Traveler created by this mutation.",
    )

    class Arguments:
        """Declare input arguments."""

        first_name = graphene.String(
            required=True, description="The traveler's first name."
        )

    def mutate(self, info, first_name):
        """Add traveler to the database."""
        traveler = models.Traveler(first_name=first_name)
        db_session.add(traveler)
        db_session.commit()

        return AddTraveler(traveler=traveler)
