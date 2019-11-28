import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import { makeStyles, Container } from "@material-ui/core";

import Meta from "../components/Head";
import LogoNavigationBar from "../components/LogoNavigationBar";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "left",
    width: "50%"
  },
  mapContainer: {
    paddingTop: theme.spacing(25),
  }
}));

const reducer = combineReducers({
  form: reduxFormReducer
});

const store = createStore(reducer);

const Itinerary = props => {
  const classes = useStyles();
  const ItineraryMap = require("../components/ItineraryMap").default;

  return (
    <div>
      <Meta />
      <LogoNavigationBar />
      <Provider store={store}>
        <div className={classes.mapContainer}>
          <Container>
            <ItineraryMap />
          </Container>
        </div>
      </Provider>
    </div>
  );
}

export default Itinerary;
