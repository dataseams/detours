import gql from "graphql-tag";

const GET_USER_RECORD = gql`
  query getUserRecord($email: String!) {
    getUserRecord(
      email: $email
    ) {
      id
      email
      gender
      age
      wantsPromotionsAndTips
      wantsReminders
    }
  }
`;

export default GET_USER_RECORD;
