import gql from "graphql-tag";

const GET_USER_TRIP_PLAN = gql`
  query($travelerEmail: String!) {
    getUserTripPlans(travelerEmail: $travelerEmail) {
      data {
        surveyResponseId
        city
        startDate
        endDate
        firstFiveIcons
      }
    }
  }
`;

export default GET_USER_TRIP_PLAN;
