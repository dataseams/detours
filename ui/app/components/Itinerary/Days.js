import React from "react";
import { AppBar, Tabs, Tab, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import LockIcon from "@material-ui/icons/Lock";
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
  labelDiv: {
    display: "flex",
    alignItems: "center",
  },
  lockIcon: {
    fontSize: "1.2rem",
    marginTop: "-2px",
    marginLeft: "5px",
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
  dateTypography: {
    display: "flex",
    alignItems: "center",
    flex: "0.6",
  },
  viewChangeButton: {
    "& .MuiButton-startIcon > *:first-child ": {
      fontSize: "27px",
    },
    "& > *:first-child": {
      textTransform: "none",
    },
    flex: "0.4",
    borderColor: "#5865BC",
  },
  labelDiv: {
    display: "flex",
    alignItems: "center",
    margin: "0 10px 0 10px",
  },
  lockIcon: {
    fontSize: "1.2rem",
    marginTop: "-2px",
    marginLeft: "5px",
  },
  span: {
    display: "flex",
  },
}));

const DailyTabs = (props) => {
  const { plan, isMobile, paymentStatus } = props;
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
          {plan.edges.map((day, index) => {
            const tabLabel = `Day ${index + 1} `;
            const disableTab = paymentStatus === "unpaid" && index !== 0;
            const isLockVisiable = disableTab && (
              <LockIcon className={classes.lockIcon} />
            );
            return (
              // <Tooltip
              //   title={
              //     isLockVisiable
              //       ? "Checkout below to gain full access to the itinerary"
              //       : ""
              //   }
              // >
              //   <span className={classes.span}>
              <Tab
                key={index}
                label={
                  <div className={classes.labelDiv}>
                    {tabLabel}
                    {isLockVisiable}
                  </div>
                }
                disabled={disableTab}
                {...a11yProps(index)}
              />
              //   </span>
              // </Tooltip>
            );
          })}
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
