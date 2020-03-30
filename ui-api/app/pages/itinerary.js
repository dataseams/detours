import React from "react";
import { useRouter } from "next/router";
import { Container } from "@material-ui/core";

import Meta from "../components/Head";
import LogoNavigationBar from "../components/LogoNavigationBar";
import ItineraryDescription from "../components/Itinerary/Description";
import DailyTabs from "../components/Itinerary/Days";
import useStyles from "../components/Itinerary/styles";
import PurchaseBox from "../components/Itinerary/PurchaseBox";
import itineraryTemplate from "../components/Itinerary/itineraryTemplate";

const resultsList = Array(10)
  .fill()
  .map((_, idx) => 10);

const Itinerary = props => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <div>
      <Meta />
      <LogoNavigationBar />
      <Container className={classes.root}>
        <p>{router.query.surveyId}</p>
        <ItineraryDescription summary={itineraryTemplate.summary} />
        <DailyTabs classes={classes} plan={itineraryTemplate.plan} />
        <PurchaseBox classes={classes} />
      </Container>
    </div>
  );
};

export default Itinerary;
