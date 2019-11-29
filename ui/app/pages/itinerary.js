import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import {
  makeStyles,
  Container,
  Typography,
  Grid,
  Box,
  Divider
} from "@material-ui/core";

import Meta from "../components/Head";
import LogoNavigationBar from "../components/LogoNavigationBar";
import { Purchase } from "../components/Buttons";
import AlignItemsList from "../components/Itinerary/ItineraryList";
import ItineraryMap from "../components/Itinerary/ItineraryMap";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(10),
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center",
    width: "95%"
  },
  itineraryBox: {
    display: "flex",
    flexGrow: 1,
    backgroundColor: "#F6F6F6",
    padding: "2em",
    height: "565px"
  },
  itineraryContainer: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    height: "400px"
  },
  purchaseContainer: {
    textAlign: "center"
  },
  purchaseItem: {
    padding: "1em"
  },
  paper: {
    height: "5em",
    padding: "5px",
    margin: "0 3px 3px 0"
  }
}));

const mapContainer = {
  height: "35vh",
  width: "100%"
};

const resultsList = Array(10)
  .fill()
  .map((_, idx) => 10);

const Itinerary = props => {
  const classes = useStyles();

  return (
    <div>
      <Meta />
      <LogoNavigationBar />
      <Container className={classes.root}>
        <Box m={10}>
          <Typography variant="h3" paragraph={true}>
            Your trip to Paris, France
          </Typography>
          <Divider variant="middle"></Divider>
          <Typography>This is a preview of your itinerary.</Typography>
          <Typography>
            &emsp;- You would spend a total of $176 per day including hotel,
            restaurant, and activities, for a total of 4 days.
          </Typography>
          <Typography>
            &emsp;- You would save an average of <b>20-30 hours </b>planning
            your trip.
          </Typography>
          <Typography>
            &emsp;- Your itinerary contains top-rated restaurants and
            experiences which directly match with your following interests.
          </Typography>
        </Box>
        <Box className={classes.itineraryBox}>
          <Grid item xs={12} className={classes.itineraryContainer}>
            <Grid item xs={4}>
              <Typography variant="h6">Monday, November 24</Typography>
              <AlignItemsList />
            </Grid>
            <Grid item xs={8}>
              <ItineraryMap containerStyle={mapContainer} />
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.purchaseContainer} m={5}>
          <Typography className={classes.purchaseItem}>
            Get complete access to your itinerary for <b>just $10</b>.
          </Typography>
          <Divider variant="middle"></Divider>
          <Purchase className={classes.purchaseItem}>Purchase</Purchase>
        </Box>
      </Container>
    </div>
  );
};

export default Itinerary;
