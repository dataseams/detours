import gql from "graphql-tag";

const GET_ITINERARY = gql`
    query getItinerary($surveyResponseNodeId: String!){
      getLastTripPlanForSurveyResponse(
        surveyResponseNodeId: $surveyResponseNodeId
      ){
        id
        city{
          name
          state
          country
        }
        spendingPerDay
        hoursSaved
        interestsMatched
        startDate
        endDate
        timeStamp
        dailyPlans{
          edges{
            node{
              date
              planItems{
                edges{
                  node{
                    order
                    activity{
                      activityType{
                        name
                        materialIcon
                      }
                      place{
                        name
                        description
                      }
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

export default GET_ITINERARY;
