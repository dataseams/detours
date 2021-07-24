"""add spending_per_day for cities

Revision ID: 5b62bf2ccf94
Revises: 640b60ec66ed
Create Date: 2021-07-23 20:01:09.838195

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "5b62bf2ccf94"
down_revision = "640b60ec66ed"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "city", sa.Column("spending_per_day", sa.Integer(), nullable=True)
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("city", "spending_per_day")
    # ### end Alembic commands ###
