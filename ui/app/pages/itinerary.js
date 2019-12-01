import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import { Container, Typography, Box, Divider } from "@material-ui/core";

import Meta from "../components/Head";
import LogoNavigationBar from "../components/LogoNavigationBar";
import { Purchase } from "../components/Buttons";
import ItineraryDescription from "../components/Itinerary/Description";
import DailyTabs from "../components/Itinerary/DailyTabs";
import useStyles from "../components/Itinerary/styles";

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
        <ItineraryDescription />
        <DailyTabs classes={classes} />
        <Box className={classes.purchaseContainer} m={5}>
          <Typography className={classes.purchaseItem}>
            Get complete access to your itinerary for <b>just $10</b>.
          </Typography>
          <Box width="100px">
            <Divider variant="middle"></Divider>
          </Box>
          <Purchase className={classes.purchaseItem}>Purchase</Purchase>
        </Box>
      </Container>
    </div>
  );
};

export default Itinerary;
