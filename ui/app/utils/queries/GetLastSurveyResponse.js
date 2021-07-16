import gql from "graphql-tag";

const GET_LAST_SURVEY_RESPONSE = gql`
  query($travelerEmail: String!) {
    getLastSurveyResponse(travelerEmail: $travelerEmail) {
      id
      timeStamp
      json
      tripPlans {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

export default GET_LAST_SURVEY_RESPONSE;
