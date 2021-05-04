import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Typography, MobileStepper } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { withStyles } from "@material-ui/styles";

import ItineraryItems from "./ItineraryItems";
import ItineraryItem from "./ItineraryItem";
import ItineraryMap from "./ItineraryMap";

var moment = require("moment");

const StyledMobileStepper = withStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 0, 1, 0),
  },
  dot: {
    backgroundColor: theme.palette.secondary.dark,
  },
  dotActive: {
    backgroundColor: theme.palette.primary.main,
  },
}))(MobileStepper);

function TabPanel(props) {
  const { isMobile, children, value, index, classes, data, ...other } = props;
  const planItems = data.planItems;
  const maxSteps = planItems.edges.length;
  const [activeStep, setActiveStep] = React.useState(0);
  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return isMobile ? (
    <Typography
      key={index}
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box className={classes.itineraryBox}>
        <Typography variant="h6">
          {moment(data.date, "YYYY-MM-DD").format("dddd, MMM DD, YYYY")}
        </Typography>
        <SwipeableViews index={activeStep} onChangeIndex={handleStepChange}>
          {planItems.edges.map((step, index) => (
            <ItineraryItem key={index} event={step} index={index} />
          ))}
        </SwipeableViews>
        <StyledMobileStepper
          steps={maxSteps}
          position="static"
          variant="dots"
          activeStep={activeStep}
          nextButton={<div />}
          backButton={<div />}
        />
        <ItineraryMap
          containerStyle={{ height: "35vh", width: "100%" }}
          events={planItems}
        />
      </Box>
    </Typography>
  ) : (
    <Typography
      key={index}
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box className={classes.itineraryBox}>
        <Typography variant="h6">
          {moment(data.date, "YYYY-MM-DD").format("dddd, MMM DD, YYYY")}
        </Typography>
        <Grid item xs={12} className={classes.itineraryContainer}>
          <Grid item xs={4} style={{ height: "35vh", overflow: "auto" }}>
            <ItineraryItems events={planItems} />
          </Grid>
          <Grid item xs={8} className={classes.mapContainer}>
            <ItineraryMap
              containerStyle={{ height: "35vh", width: "100%" }}
              events={planItems}
            />
          </Grid>
        </Grid>
      </Box>
    </Typography>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabPanel;
