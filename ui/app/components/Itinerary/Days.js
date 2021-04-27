import React from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import TabPanel from "./TabPanel";

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  itineraryBox: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    borderColor: theme.palette.primary.main,
    borderWidth: "0px 1px 1px 1px",
    borderStyle: "solid",
    padding: "2em",
  },
  itineraryContainer: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    height: "35vh",
  },
  mapContainer: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    padding: "0 0 0 0.25em",
  },
}));

const useMobileStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  itineraryBox: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    borderColor: theme.palette.primary.main,
    borderWidth: "0px 1px 1px 1px",
    borderStyle: "solid",
    padding: theme.spacing(1),
  },
  itineraryContainer: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    height: "35vh",
  },
  mapContainer: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    padding: "0 0 0 0.25em",
  },
}));

const DailyTabs = (props) => {
  const { plan, isMobile } = props;
  const classes = isMobile ? useMobileStyles() : useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
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
          {plan.edges.map((day, index) => (
            <Tab
              key={index}
              label={"Day " + (index + 1)}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </AppBar>
      {plan.edges.map((day, index) => (
        <TabPanel
          key={index}
          value={value}
          index={index}
          classes={classes}
          data={day.node}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
};

export default DailyTabs;
