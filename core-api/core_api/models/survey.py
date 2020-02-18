"""Itinerary data model."""
from datetime import datetime

from sqlalchemy import Column, Integer, JSON, DateTime, ForeignKey
from sqlalchemy.orm import relationship, backref

from ..database import Base
from . import Traveler


class SurveyResult(Base):
    """Add survey results entity model."""

    __tablename__ = "personality_survey"
    id = Column(Integer, primary_key=True)
    traveler_id = Column(Integer, ForeignKey("traveler.id"))
    json = Column(JSON)
    time_stamp = Column(DateTime, default=datetime.now())

    traveler = relationship(
        Traveler,
        backref=backref("survey_results", uselist=True, cascade="delete,all"),
    )
