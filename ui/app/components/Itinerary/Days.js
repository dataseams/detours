import React from "react";
import PropTypes from "prop-types";
import { Box, AppBar, Tabs, Tab, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

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
        <Grid item xs={12} className={classes.itineraryContainer}>
          <Grid item xs={4}>
            <Typography variant="h6">Monday, November 24</Typography>
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

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

const DailyTabs = props => {
  const { classes } = props;
  const customClasses = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={customClasses.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs"
        >
          <Tab label="Day 1" {...a11yProps(0)} />
          <Tab label="Day 2" {...a11yProps(1)} />
          <Tab label="Day 3" {...a11yProps(2)} />
          <Tab label="Day 4" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} classes={classes} />
      <TabPanel value={value} index={1} classes={classes} />
    </div>
  );
};

export default DailyTabs;
