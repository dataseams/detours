import React from "react";
import { Container } from "@material-ui/core";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/styles";

import Meta from "../components/Head";
import LogoNavigationBar from "../components/LogoNavigationBar";
import ItineraryDescription from "../components/Itinerary/Description";
import DailyTabs from "../components/Itinerary/Days";
import PurchaseBox from "../components/Itinerary/PurchaseBox";
import { itineraryReducer } from "../redux/reducers";
import GET_ITINERARY from "../utils/queries/GetItinerary";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(10),
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center"
  }
}));

const store = createStore(itineraryReducer);

const Itinerary = () => {
  const router = useRouter();
  const classes = useStyles();
  const variables = { "surveyResponseNodeId": router.query.surveyId };
  const { loading, error, data } = useQuery(GET_ITINERARY, { variables: variables });

  return (
    <Provider store={store}>
      <div>
        <Meta />
        <div>
          <LogoNavigationBar />
          {loading ? <p>Loading...</p> :
            <Container className={classes.root}>
              <ItineraryDescription fullItinerary={data.getLastTripPlanForSurveyResponse} />
              <DailyTabs plan={data.getLastTripPlanForSurveyResponse.dailyPlans} />
              <PurchaseBox />
            </Container>}
        </div>
      </div>
    </Provider>
  );
};

export default Itinerary;
