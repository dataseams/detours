import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { makeStyles } from "@material-ui/styles";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Meta from "../components/Head";
import { itineraryReducer } from "../redux/reducers";
import LogoNavigationBar from "../components/LogoNavigationBar";
import SavedForYou from "../components/Itinerary/SavedForYou";
import SavedItinerariesDetails from "../components/Itinerary/SavedItinerariesDetails";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "180px",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "80px",
    },
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
}));
const MyItineraries = () => {
  const store = createStore(itineraryReducer);
  const classes = useStyles();

  return (
    <Provider store={store}>
      <Meta />
      <LogoNavigationBar />
      <Container className={classes.root}>
        <Grid lg={3}>
          <SavedForYou />
        </Grid>
        <Grid lg={9}>
          <SavedItinerariesDetails />
          <SavedItinerariesDetails />
        </Grid>
      </Container>
    </Provider>
  );
};

export default MyItineraries;
