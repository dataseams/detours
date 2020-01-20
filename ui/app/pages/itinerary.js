import React from "react";
import { Container } from "@material-ui/core";

import Meta from "../components/Head";
import LogoNavigationBar from "../components/LogoNavigationBar";
import ItineraryDescription from "../components/Itinerary/Description";
import DailyTabs from "../components/Itinerary/Days";
import useStyles from "../components/Itinerary/styles";
import PurchaseBox from "../components/Itinerary/PurchaseBox";
import sampleItinerary from "../components/Itinerary/sampleItinerary";

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
        <ItineraryDescription summary={sampleItinerary.summary} />
        <DailyTabs classes={classes} plan={sampleItinerary.plan} />
        <PurchaseBox classes={classes} />
      </Container>
    </div>
  );
};

export default Itinerary;
