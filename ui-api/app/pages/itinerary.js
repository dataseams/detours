import React from "react";
import { Container } from "@material-ui/core";
import { createApolloFetch } from "apollo-fetch";
import { createStore } from "redux";
import { Provider } from "react-redux";

import Meta from "../components/Head";
import LogoNavigationBar from "../components/LogoNavigationBar";
import ItineraryDescription from "../components/Itinerary/Description";
import DailyTabs from "../components/Itinerary/Days";
import useStyles from "../components/Itinerary/styles";
import PurchaseBox from "../components/Itinerary/PurchaseBox";
import { itineraryReducer } from "../redux/reducers";

const store = createStore(itineraryReducer);

const Itinerary = props => {
  const classes = useStyles();
  const { itinerarySummary, fullItinerary } = props;

  return (
    <Provider store={store}>
      <div>
        <Meta />
        <div>
          <LogoNavigationBar />
          <Container className={classes.root}>
            <ItineraryDescription summary={itinerarySummary} />
            <DailyTabs classes={classes} plan={fullItinerary.dailyPlans} />
            <PurchaseBox classes={classes} />
          </Container>
        </div>
      </div>
    </Provider>
  );
};

export async function getServerSideProps(context) {
  const graphQlUri = "http://localhost:5000/graphql";
  const variables = { "surveyResponseNodeId": context.query.surveyId };
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
  const fetch = createApolloFetch({ uri: graphQlUri });
  const res = await fetch({ query: query, variables: variables });
  const fullItinerary = res.data.getLastTripPlanForSurveyResponse;
  const itinerarySummary = {
    "cityName": fullItinerary.city.name + ", " + (fullItinerary.city.state || fullItinerary.city.country),
    "spendingPerDay": fullItinerary.spendingPerDay,
    "hoursSaved": fullItinerary.hoursSaved,
    "interestsMatched": JSON.parse(fullItinerary.interestsMatched),
  }
  return { props: { fullItinerary: fullItinerary, itinerarySummary: itinerarySummary } }
}

export default Itinerary;
