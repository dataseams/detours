import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@material-ui/core";

import AlignItemsList from "./ItineraryItems";
import ItineraryMap from "./ItineraryMap";

var moment = require("moment");

function TabPanel(props) {
  const { children, value, index, classes, data, ...other } = props;
  const locations = data.planItems;

  return (
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
          <Grid item xs={4} style={{ height: "100%", overflow: "auto" }}>
            <AlignItemsList events={data.planItems} />
          </Grid>
          <Grid item xs={8} className={classes.mapContainer}>
            <ItineraryMap
              containerStyle={{ height: "35vh", width: "100%" }}
              events={data.planItems}
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
  value: PropTypes.any.isRequired
};

export default TabPanel;
