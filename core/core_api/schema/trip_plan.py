"""TripPlan schema."""
from graphene import relay, String, Date, List, ObjectType
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


class UserTripPlans(ObjectType):
    """List of trip plan information for a user's my itinerary page."""

    survey_response_id = String()
    city_state = String()
    start_date = Date()
    end_date = Date()
    first_five_icons = List(
        String(),
        description="Material icon codes for the first five trip activities",
    )

    class Arguments:
        """Declare input to this query, user_email."""

        traveler_email = String(
            required=True, description="The traveler email from Firebase auth."
        )
