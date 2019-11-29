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
  Paper,
  Divider
} from "@material-ui/core";

import Meta from "../components/Head";
import LogoNavigationBar from "../components/LogoNavigationBar";
import { Purchase } from "../components/Buttons";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(10),
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center",
    width: "90%"
  },
  itineraryContainer: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    height: "400px"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center"
  },
  paperContainer: {
    overflow: "scroll"
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
  const ItineraryMap = require("../components/ItineraryMap").default;

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
        <Grid item xs={12} className={classes.itineraryContainer}>
          <Grid item xs={4}>
            <Typography variant="h6">Monday, November 24</Typography>
            <Grid className={classes.paperContainer}>
              {resultsList.map((choice, index) => (
                <Paper className={classes.paper}>This is paper {index}</Paper>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <ItineraryMap containerStyle={mapContainer} />
          </Grid>
        </Grid>
        <Box className={classes.buttonContainer}>
          <Purchase>Purchase</Purchase>
        </Box>
      </Container>
    </div>
  );
};

export default Itinerary;
