import React from "react";
import { Container } from "@material-ui/core";
import { createApolloFetch } from "apollo-fetch";
import { createStore } from "redux";
import { Provider } from "react-redux";
import ApolloClient from "apollo-boost";

import Meta from "../components/Head";
import LogoNavigationBar from "../components/LogoNavigationBar";
import ItineraryDescription from "../components/Itinerary/Description";
import DailyTabs from "../components/Itinerary/Days";
import useStyles from "../components/Itinerary/styles";
import PurchaseBox from "../components/Itinerary/PurchaseBox";
import { itineraryReducer } from "../redux/reducers";
import GET_ITINERARY from "../utils/queries/GetItinerary";

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
  const graphQlUri = process.env.CORE_API_URL;
  const variables = { "surveyResponseNodeId": context.query.surveyId };

  const fetch = createApolloFetch({ uri: graphQlUri });
  const res = await fetch({ query: GET_ITINERARY, variables: variables });
  // const client = new ApolloClient({ uri: graphQlUri });
  // const results = client.query(
  //   {
  //     query: GET_ITINERARY,
  //     variables: variables
  //   }
  // )
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
