import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@material-ui/core";

import AlignItemsList from "./Items";
import ItineraryMap from "./Map";

var moment = require("moment");

function TabPanel(props) {
  const { children, value, index, classes, data, ...other } = props;

  return (
    <Typography
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
          <Grid item xs={4}>
            <AlignItemsList events={data.events} />
          </Grid>
          <Grid item xs={8}>
            <ItineraryMap containerStyle={{ height: "35vh", width: "100%" }} />
          </Grid>
        </Grid>
      </Box>
    </Typography>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export default TabPanel;
