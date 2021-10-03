import gql from "graphql-tag";

const GET_USER_RECORD = gql`
  query($email: String!) {
    getUserRecord(email: $email) {
      email
      age
      gender
      id
      wantsReminders
      wantsPromotionsAndTips
    }
  }
`;

export default GET_USER_RECORD;
