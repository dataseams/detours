"""GraphQL schema."""
from models import Department as DepartmentModel
from models import Employee as EmployeeModel
from models import Role as RoleModel

import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType


class Department(SQLAlchemyObjectType):
    """Department entity."""

    class Meta:
        """Meta data."""

        model = DepartmentModel
        interfaces = (relay.Node,)


class Employee(SQLAlchemyObjectType):
    """Employee entity."""

    class Meta:
        """Meta data."""

        model = EmployeeModel
        interfaces = (relay.Node,)


class Role(SQLAlchemyObjectType):
    """Role entity."""

    class Meta:
        """Meta data."""

        model = RoleModel
        interfaces = (relay.Node,)


class Query(graphene.ObjectType):
    """Graphene root node."""

    node = relay.Node.Field()
    # Allow only single column sorting
    all_employees = SQLAlchemyConnectionField(
        Employee, sort=Employee.sort_argument()
    )
    # Allow sorting over multiple columns, by default over the primary key
    all_roles = SQLAlchemyConnectionField(Role)
    # Disable sorting over this field
    all_departments = SQLAlchemyConnectionField(Department, sort=None)


schema = graphene.Schema(query=Query, types=[Department, Employee, Role])
