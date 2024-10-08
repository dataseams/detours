"""User schema."""
from uuid import uuid4

from graphene import Boolean, Field, Int, Mutation, String, relay
from graphene_sqlalchemy import SQLAlchemyObjectType

from .. import models
from ..config import db_session


class User(SQLAlchemyObjectType):
    """User entity."""

    class Meta:
        """Meta class."""

        model = models.User
        interfaces = (relay.Node,)


class AddUser(Mutation):
    """Update user age in the database."""

    user_record = Field(
        lambda: User, description="User record added by this mutation."
    )

    class Arguments:
        """Declare input arguments."""

        email = String(required=True, description="User's email")
        age = Int(required=False, description="User's age")
        gender = String(required=False, description="User's gender")

    def mutate(self, info, email, age):
        """Update user age in the database."""
        user_record = (
            db_session.query(models.User).filter_by(email=email).first()
        )
        if not user_record:
            user_record = models.User(email=email, age=age)
            db_session.add(user_record)
            db_session.commit()

        return UpdateUserAge(user_record=user_record)


class UpdateUserAge(Mutation):
    """Update user age in the database."""

    user_record = Field(
        lambda: User, description="User record updated by this mutation."
    )

    class Arguments:
        """Declare input arguments."""

        email = String(required=True, description="User's email")
        age = Int(required=True, description="User's age")

    def mutate(self, info, email, age):
        """Update user age in the database."""
        user_record = (
            db_session.query(models.User).filter_by(email=email).first()
        )
        if not user_record:
            user_record = models.User(
                email=email,
                wants_promotions_and_tips=True,
                wants_reminders=True,
            )
            db_session.add(user_record)
        user_record.age = age
        db_session.commit()

        return UpdateUserAge(user_record=user_record)


class UpdateUserGender(Mutation):
    """Update user gender in the database."""

    user_record = Field(
        lambda: User, description="User record updated by this mutation."
    )

    class Arguments:
        """Declare input arguments."""

        email = String(required=True, description="User's email address")
        gender = String(
            required=True, description="User's gender. One of Her, Him, Their"
        )

    def mutate(self, info, email, gender):
        """Update user gender in the database."""
        user_record = (
            db_session.query(models.User).filter_by(email=email).first()
        )
        if not user_record:
            user_record = models.User(
                email=email,
                wants_promotions_and_tips=True,
                wants_reminders=True,
            )
            db_session.add(user_record)
        user_record.gender = gender
        db_session.commit()

        return UpdateUserGender(user_record=user_record)


class UpdateUserWantsRemindersFlag(Mutation):
    """Update user's wants_reminders preference in the database."""

    user_record = Field(
        lambda: User, description="User record updated by this mutation."
    )

    class Arguments:
        """Declare input arguments."""

        email = String(required=True, description="User's email address")
        wants_reminders = Boolean(
            required=True, description="User's wants reminders preference"
        )

    def mutate(self, info, email, wants_reminders):
        """Update user's wants reminders flag in the database."""
        user_record = (
            db_session.query(models.User).filter_by(email=email).first()
        )
        if not user_record:
            user_record = models.User(
                email=email,
                wants_promotions_and_tips=True,
                wants_reminders=True,
            )
            db_session.add(user_record)
        user_record.wants_reminders = wants_reminders
        db_session.commit()

        return UpdateUserWantsRemindersFlag(user_record=user_record)


class UpdateUserWantsPromotionsAndTipsFlag(Mutation):
    """Update user's promotions and tips preference in the database."""

    user_record = Field(
        lambda: User, description="User record updated by this mutation."
    )

    class Arguments:
        """Declare input arguments."""

        email = String(required=True, description="User's email address")
        wants_promotions_and_tips = Boolean(
            required=True,
            description="User's wants promotions and tips preference",
        )

    def mutate(self, info, email, wants_promotions_and_tips):
        """Update user's wants promotions and tips flag in the database."""
        user_record = (
            db_session.query(models.User).filter_by(email=email).first()
        )
        if not user_record:
            user_record = models.User(
                email=email,
                wants_promotions_and_tips=True,
                wants_reminders=True,
            )
            db_session.add(user_record)
        user_record.wants_promotions_and_tips = wants_promotions_and_tips
        db_session.commit()

        return UpdateUserWantsPromotionsAndTipsFlag(user_record=user_record)


class UpdateUserWantsNoEmails(Mutation):
    """Update user's preference for no email at all in the database."""

    user_record = Field(
        lambda: User, description="User record updated by this mutation."
    )

    class Arguments:
        """Declare input arguments."""

        email = String(required=True, description="User's email address")

    def mutate(self, info, email):
        """Update user's preference for no emails at all in the database."""
        user_record = (
            db_session.query(models.User).filter_by(email=email).first()
        )
        if not user_record:
            user_record = models.User(
                email=email,
                wants_promotions_and_tips=True,
                wants_reminders=True,
            )
            db_session.add(user_record)
        user_record.wants_reminders = False
        user_record.wants_promotions_and_tips = False
        db_session.commit()

        return UpdateUserWantsNoEmails(user_record=user_record)


class DeleteUser(Mutation):
    """Replace user's email with a uuid in the database."""

    user_record = Field(
        lambda: User, description="User record updated by this mutation."
    )

    class Arguments:
        """Declare input arguments."""

        email = String(required=True, description="User's email address")
        leaving_reason = Int(
            required=True, description="Reason for leaving as an integer id"
        )
        improvement = String(
            required=True,
            description="User's feedback on what can be improved",
        )

    def mutate(self, info, email, leaving_reason, improvement):
        """Replace user's email with a uuid in the database."""
        incognito_id = uuid4().hex
        user_record = (
            db_session.query(models.User).filter_by(email=email).first()
        )
        if user_record:
            user_record.email = incognito_id
        survey_response_records = (
            db_session.query(models.SurveyResponse)
            .filter_by(traveler_email=email)
            .all()
        )
        for record in survey_response_records:
            record.traveler_email = incognito_id
        attrition_feedback_record = models.AttritionFeedback(
            email=email,
            incognito_id=incognito_id,
            reason_for_leaving=leaving_reason,
            improvement=improvement,
        )
        db_session.add(attrition_feedback_record)
        db_session.commit()

        return UpdateUserWantsNoEmails(user_record=user_record)
