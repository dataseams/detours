import gql from "graphql-tag";

const USER_WANTS_NO_EMAILS_FLAG = gql`
  mutation($email: String!) {
    updateUserWantsNoEmails(email: $email) {
      userRecord {
        id
      }
    }
  }
`;

export default USER_WANTS_NO_EMAILS_FLAG;
