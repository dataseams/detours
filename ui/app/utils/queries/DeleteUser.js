import gql from "graphql-tag";

const DELETE_USER = gql`
  mutation($email: String!) {
    deleteUser(email: $email) {
      userRecord {
        id
      }
    }
  }
`;

export default DELETE_USER;
