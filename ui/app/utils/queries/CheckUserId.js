import gql from "graphql-tag";

const CHECK_USER_ID = gql`
  query($surveyResponseNodeId: String!) {
    isItinerarySaved(surveyResponseNodeId: $surveyResponseNodeId)
  }
`;

export default CHECK_USER_ID;
