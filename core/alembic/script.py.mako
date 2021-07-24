"""${message}

Revision ID: ${up_revision}
Revises: ${down_revision | comma,n}
Create Date: ${create_date}

"""
import sqlalchemy as sa
from alembic import context, op
${imports if imports else ""}

# revision identifiers, used by Alembic.
revision = ${repr(up_revision)}
down_revision = ${repr(down_revision)}
branch_labels = ${repr(branch_labels)}
depends_on = ${repr(depends_on)}


def upgrade():
    """Upgrade database."""
    schema_upgrades()
    if context.get_x_argument(as_dictionary=True).get('data', None):
        data_upgrades()


def downgrade():
    """Downgrade database."""
    if context.get_x_argument(as_dictionary=True).get('data', None):
        data_downgrades()
    schema_downgrades()


def schema_upgrades():
    """Upgrade schema."""
    ${upgrades if upgrades else "pass"}


def schema_downgrades():
    """Downgrade schema."""
    ${downgrades if downgrades else "pass"}


def data_upgrades():
    """Add any optional data upgrade migrations here."""
    pass


def data_downgrades():
    """Add any optional data downgrade migrations here."""
    pass
