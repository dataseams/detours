"""TripPlan schema."""
from graphene import Date, List, ObjectType, String, relay
from graphene_sqlalchemy import SQLAlchemyObjectType

from .. import models


class TripPlan(SQLAlchemyObjectType):
    """Trip entity."""

    class Meta:
        """Meta class."""

        model = models.TripPlan
        exclude_fields = (
            "city_id",
            "start_time",
            "end_time",
            "survey_response_id",
        )
        interfaces = (relay.Node,)


class UserTripPlan(ObjectType):
    """A trip plan object for a user's my itinerary page."""

    survey_response_id = String(
        description="Base64 encoding of the survey response id"
    )
    city = String(description="City, State (abbreviated)")
    start_date = Date(description="Trip start date")
    end_date = Date(description="Trip end date")
    first_five_icons = List(
        String,
        description="Material icon codes for the first five trip activities",
    )


class UserTripPlans(ObjectType):
    """List of trip plan information for a user's my itinerary page."""

    data = List(UserTripPlan)
