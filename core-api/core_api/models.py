"""Module for all data models logic."""
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import backref, relationship

from .database import Base


class Department(Base):
    """Add department entity model."""

    __tablename__ = "department"
    id = Column(Integer, primary_key=True)
    name = Column(String)


class Role(Base):
    """Add role entity model."""

    __tablename__ = "role"
    id = Column(Integer, primary_key=True)
    name = Column(String)


class Employee(Base):
    """Add employee entity model."""

    __tablename__ = "employee"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    hired_on = Column(DateTime, default=func.now())
    department_id = Column(Integer, ForeignKey("department.id"))
    role_id = Column(Integer, ForeignKey("role.id"))
    # Use cascade="delete,all" to propagate the deletion of a Department
    # onto its employees
    department = relationship(
        Department,
        backref=backref("employees", uselist=True, cascade="delete,all"),
    )
    role = relationship(
        Role, backref=backref("role", uselist=True, cascade="delete,all")
    )
