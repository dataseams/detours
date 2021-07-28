"""Fix null payment status.

Revision ID: 17f02ccbe3c7
Revises: 8106e7fed1e4
Create Date: 2021-07-27 21:04:26.910531

"""
import sqlalchemy as sa
from alembic import context, op
from sqlalchemy import orm
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


# revision identifiers, used by Alembic.
revision = "17f02ccbe3c7"
down_revision = "8106e7fed1e4"
branch_labels = None
depends_on = None


class SurveyResponse(Base):
    """Define a personality survey response entity."""

    __tablename__ = "survey_response"
    id = sa.Column(sa.Integer, primary_key=True)
    payment_status = sa.Column(sa.String(6), default="unpaid")


def upgrade():
    """Upgrade database."""
    schema_upgrades()
    if context.get_x_argument(as_dictionary=True).get("data", None):
        data_upgrades()


def downgrade():
    """Downgrade database."""
    if context.get_x_argument(as_dictionary=True).get("data", None):
        data_downgrades()
    schema_downgrades()


def schema_upgrades():
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###


def schema_downgrades():
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###


def data_upgrades():
    """Add any optional data upgrade migrations here."""
    bind = op.get_bind()
    session = orm.Session(bind=bind)
    for record in (
        session.query(SurveyResponse)
        .filter(SurveyResponse.payment_status == None)  # noqa: E711
        .all()
    ):
        record.payment_status = "unpaid"
    session.commit()


def data_downgrades():
    """Add any optional data downgrade migrations here."""
    pass
