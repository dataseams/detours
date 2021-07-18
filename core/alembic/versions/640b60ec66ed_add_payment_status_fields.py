"""add payment_status fields

Revision ID: 640b60ec66ed
Revises: 50478441c45c
Create Date: 2021-07-06 18:12:59.544087

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "640b60ec66ed"
down_revision = "50478441c45c"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "survey_response",
        sa.Column("checkout_id", sa.String(length=100), nullable=True),
    )
    op.add_column(
        "survey_response",
        sa.Column(
            "payment_status",
            sa.String(length=6),
            nullable=True,
            default="unpaid",
        ),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("survey_response", "payment_status")
    op.drop_column("survey_response", "checkout_id")
    # ### end Alembic commands ###
