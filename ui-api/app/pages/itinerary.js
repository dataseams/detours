import React from "react";
import { useRouter } from "next/router";
import { Container } from "@material-ui/core";
import { createApolloFetch } from "apollo-fetch";

import Meta from "../components/Head";
import LogoNavigationBar from "../components/LogoNavigationBar";
import ItineraryDescription from "../components/Itinerary/Description";
import DailyTabs from "../components/Itinerary/Days";
import useStyles from "../components/Itinerary/styles";
import PurchaseBox from "../components/Itinerary/PurchaseBox";
import itineraryTemplate from "../components/Itinerary/itineraryTemplate";

var fullItinerary = itineraryTemplate.data.getLastTripPlanForSurveyResponse;
var irinerarySummary = {
  "cityName": fullItinerary.city.name + ", " + (fullItinerary.city.state || fullItinerary.city.country),
  "spendingPerDay": fullItinerary.spendingPerDay,
  "hoursSaved": fullItinerary.hoursSaved,
  "interestsMatched": JSON.parse(fullItinerary.interestsMatched),
}

const Itinerary = props => {
  const classes = useStyles();
  const router = useRouter();
  const graphQl = "http://localhost:5000/graphql"
  const variables = { "surveyResponseNodeId": "U3VydmV5UmVzcG9uc2U6MQ==" };
  const query = `
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
  const fetch = createApolloFetch({ uri: graphQl });
  fetch({ query: query, variables: variables }).then(res => {
    console.log(res.data.getLastTripPlanForSurveyResponse.city.name)
  });

  return (
    <div>
      <Meta />
      <LogoNavigationBar />
      <Container className={classes.root}>
        <p>{router.query.surveyId}</p>
        <ItineraryDescription summary={irinerarySummary} />
        <DailyTabs classes={classes} plan={fullItinerary.dailyPlans} />
        <PurchaseBox classes={classes} />
      </Container>
    </div>
  );
};

export default Itinerary;
