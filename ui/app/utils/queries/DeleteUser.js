import gql from "graphql-tag";

const DELETE_USER = gql`
  mutation($email: String!, $leavingReason: Int!, $improvement: String!) {
    deleteUser(
      email: $email
      leavingReason: $leavingReason
      improvement: $improvement
    ) {
      userRecord {
        id
      }
    }
  }
`;

export default DELETE_USER;
