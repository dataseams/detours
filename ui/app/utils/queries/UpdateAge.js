import gql from "graphql-tag";

const UPDATE_AGE = gql`
  mutation($email: String!, $age: Int!) {
    updateUserAge(email: $email, age: $age) {
      userRecord {
        id
      }
    }
  }
`;

export default UPDATE_AGE;
