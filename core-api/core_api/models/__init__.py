"""Module for all data models logic."""
from datetime import time
from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    Date,
    Time,
    ForeignKey,
    Integer,
    String,
    JSON,
)
from sqlalchemy.orm import relationship, backref

from ..database import Base


class TimeOfDay(Base):
    """Define a time of day entity."""

    VALUES = {
        "early_moring": (time(1, 0, 0), time(4, 59, 59)),
        "morning": (time(5, 0, 0), time(8, 59, 59)),
        "noon": (time(9, 0, 0), time(12, 59, 59)),
        "afternoon": (time(13, 0, 0), time(16, 59, 59)),
        "evening": (time(17, 0, 0), time(20, 59, 59)),
        "night": (time(21, 0, 0), time(12, 59, 59)),
    }

    __tablename__ = "time_of_day"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    start_time = Column(Time)
    end_time = Column(Time)


class City(Base):
    """Define a city entity."""

    __tablename__ = "city"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    state = Column(String)
    state_abbr = Column(String)
    country = Column(String)


class Traveler(Base):
    """Define a traveler entity."""

    __tablename__ = "traveler"
    id = Column(Integer, primary_key=True)
    first_name = Column(String)
    middle_name = Column(String)
    last_name = Column(String)
    time_stamp = Column(DateTime, default=datetime.now())


class SurveyResponse(Base):
    """Define a personality survey response entity."""

    __tablename__ = "survey_response"
    id = Column(Integer, primary_key=True)
    traveler_id = Column(Integer, ForeignKey("traveler.id"))
    json = Column(JSON)
    time_stamp = Column(DateTime, default=datetime.now())

    traveler = relationship(
        "Traveler",
        backref=backref("survey_response", uselist=True, cascade="delete,all"),
    )


class TripPlan(Base):
    """Define a trip plan entity."""

    __tablename__ = "trip_plan"
    id = Column(Integer, primary_key=True)
    survey_response_id = Column(Integer, ForeignKey("survey_response.id"))
    start_date = Column(Date)
    end_date = Column(Date)
    start_time = Column(Integer, ForeignKey("time_of_day.id"))
    # end_time = Column(Integer, ForeignKey("end_time_of_day.id"))
    city_id = Column(Integer, ForeignKey("city.id"))
    traveler_id = Column(Integer, ForeignKey("traveler.id"))

    start_time_of_day = relationship("TimeOfDay")
    # end_time_of_day = relationship("TimeOfDay")
    city = relationship("City")
    traveler = relationship("Traveler")
    daily_plans = relationship("DailyPlan", back_populates="trip_plan")
    survey_response = relationship(
        "SurveyResponse",
        backref=backref("trip_plans", uselist=True, cascade="delete,all"),
    )


class DailyPlan(Base):
    """Define a day's plan in the trip."""

    __tablename__ = "daily_plan"
    id = Column(Integer, primary_key=True)
    date = Column(Date)
    trip_plan_id = Column(Integer, ForeignKey("trip_plan.id"))

    trip_plan = relationship("TripPlan", back_populates="daily_plans")
    plan_items = relationship("PlanItem", back_populates="daily_plan")


class PlanItem(Base):
    """Define an itinerary item."""

    __tablename__ = "plan_item"
    id = Column(Integer, primary_key=True)
    order = Column(Integer)
    daily_plan_id = Column(Integer, ForeignKey("daily_plan.id"))
    activity_id = Column(Integer, ForeignKey("activity.id"))

    daily_plan = relationship("DailyPlan", back_populates="plan_items")


class Activity(Base):
    """Define an activity entity."""

    __tablename__ = "activity"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    place_id = Column(Integer, ForeignKey("place.id"))
    activity_type_id = Column(Integer, ForeignKey("activity_type.id"))

    plan_items = relationship(
        "PlanItem",
        backref=backref("activity", uselist=False, cascade="delete,all"),
    )


class ActivityType(Base):
    """Define an activity type entity."""

    # key = category, value = material icon code
    VALUES = {
        "hotel": "hotel",
        "food": "restaurant",
        "tour": "directions_bike",
    }

    __tablename__ = "activity_type"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    material_icon = Column(String)

    activities = relationship(
        "Activity",
        backref=backref("activity_type", uselist=False, cascade="delete,all"),
    )


class Place(Base):
    """Define a place entity."""

    __tablename__ = "place"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)

    activities = relationship(
        "Activity",
        backref=backref("place", uselist=False, cascade="delete,all"),
    )
