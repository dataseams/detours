import gql from "graphql-tag";

const UPDATE_GENDER = gql`
  mutation($email: String!, $gender: String!) {
    updateUserGender(email: $email, gender: $gender) {
      userRecord {
        id
      }
    }
  }
`;

export default UPDATE_GENDER;
