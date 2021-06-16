"""Delete Tables

Revision ID: 5379d8489aa2
Revises: 
Create Date: 2021-06-05 03:42:02.255611

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "5379d8489aa2"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.execute("DROP TABLE IF EXISTS plan_item")
    op.execute("DROP TABLE IF EXISTS daily_plan")
    op.execute("DROP TABLE IF EXISTS activity")
    op.execute("DROP TABLE IF EXISTS trip_plan")
    op.execute("DROP TABLE IF EXISTS survey_response")
    op.execute("DROP TABLE IF EXISTS city")
    op.execute("DROP TABLE IF EXISTS place")
    op.execute("DROP TABLE IF EXISTS activity_type")
    op.execute("DROP TABLE IF EXISTS time_of_day")


def downgrade():
    # ### No need to revert the changes ###
    pass
