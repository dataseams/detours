import gql from "graphql-tag";

const UPDATE_USER = gql`
  mutation updateEmail(
    $surveyResponseId: String!,
    $travelerEmail: String!
  ){
    updateTravelerEmailForSurveyResponse(surveyResponseId: $surveyResponseId, travelerEmail: $travelerEmail){
      surveyResponse{
        id
        travelerEmail
      }
    }
  }
`;

export default UPDATE_USER;
