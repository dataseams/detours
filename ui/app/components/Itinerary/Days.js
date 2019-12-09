import React from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import TabPanel from "./TabPanel";
import sampleItinerary from "./sampleItinerary";

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
          {sampleItinerary.plan.days.map((day, index) => (
            <Tab key={day.order} label={"Day " + (day.order + 1)} {...a11yProps(day.order)} />
          ))}
        </Tabs>
      </AppBar>
      {sampleItinerary.plan.days.map((day, index) => (
        <TabPanel key={day.order} value={value} index={day.order} classes={classes} />
      ))}
    </div>
  );
};

export default DailyTabs;
