import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@material-ui/core";

import AlignItemsList from "./Items";
import ItineraryMap from "./Map";

function TabPanel(props) {
  const { children, value, index, classes, ...other } = props;

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
        <Typography variant="h6">Monday, November 24</Typography>
        <Grid item xs={12} className={classes.itineraryContainer}>
          <Grid item xs={4}>
            <AlignItemsList />
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
