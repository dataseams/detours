import gql from "graphql-tag";

const UPDATE_USER_WANTS_PROMOTIONS_AND_TIPS_FLAG = gql`
  mutation($email: String!, $wantsPromotionsAndTips: Boolean!) {
    updateUserWantsPromotionsAndTipsFlag(
      email: $email
      wantsPromotionsAndTips: $wantsPromotionsAndTips
    ) {
      userRecord {
        id
        wantsPromotionsAndTips
      }
    }
  }
`;

export default UPDATE_USER_WANTS_PROMOTIONS_AND_TIPS_FLAG;
