import gql from "graphql-tag";

const CREATE_PLAN_MUTATION = gql`
  mutation createPlanForSurveyResp(
    $travelerEmail: String!
    $json: JSONString!
  ) {
    createPlanForSurveyResponse(travelerEmail: $travelerEmail, json: $json) {
      surveyResponse {
        id
        timeStamp
        json
      }
    }
  }
`;

export default CREATE_PLAN_MUTATION;
