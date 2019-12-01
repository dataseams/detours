import React from "react";
import { Box, AppBar, Tabs, Tab, Grid, Typography } from "@material-ui/core";

import AlignItemsList from "./Items";
import ItineraryMap from "./Map";

const mapContainer = {
  height: "35vh",
  width: "100%"
};

const DailyTabs = props => {
  const { classes } = props;

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          textColor="primary"
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs"
        >
          <Tab label="Day 1" />
          <Tab label="Day 2" />
          <Tab label="Day 3" />
          <Tab label="Day 4" />
        </Tabs>
      </AppBar>
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
    </div>
  );
};

export default DailyTabs;
