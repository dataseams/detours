import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MapIcon from "@material-ui/icons/Map";
import ListIcon from "@material-ui/icons/List";
import ItineraryItems from "./ItineraryItems";
import ItineraryItem from "./ItineraryItem";
import ItineraryMap from "./ItineraryMap";

var moment = require("moment");

function TabPanel(props) {
  const { isMobile, children, value, index, classes, data, ...other } = props;
  const planItems = data.planItems;
  const [listViewOnMobile, setListViewOnMobile] = React.useState(true);
  const [iteneraryIconToHover, setIteneraryIconToHover] = React.useState(null);

  const changeListView = () => {
    setListViewOnMobile(!listViewOnMobile);
  };
  const onItineraryItemHover = (index) => {
    setIteneraryIconToHover(index);
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
        <Box py={1} display="flex">
          <Typography variant="body2" className={classes.dateTypography}>
            {moment(data.date, "YYYY-MM-DD").format("dddd, MMM DD, YYYY")}
          </Typography>
          <span className={classes.viewChangeButton}>
            <Button
              startIcon={
                listViewOnMobile === false ? <ListIcon /> : <MapIcon />
              }
              variant="outlined"
              color="primary"
              size="small"
              onClick={changeListView}
              fullWidth={true}
            >
              {listViewOnMobile === false ? "List View" : "Map View"}{" "}
            </Button>
          </span>
        </Box>{" "}
        {planItems.edges.map((step, index) => (
          <ItineraryItem
            key={index}
            event={step}
            index={index}
            listLength={planItems.edges.length}
            type={listViewOnMobile === false ? "none" : "block"}
          />
        ))}
        <ItineraryMap
          containerStyle={{
            height: "35vh",
            width: "100%",
            display: listViewOnMobile ? "none" : "block",
          }}
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
            <ItineraryItems
              events={planItems}
              onItineraryItemHover={onItineraryItemHover}
            />
          </Grid>
          <Grid item xs={8} className={classes.mapContainer}>
            <ItineraryMap
              containerStyle={{ height: "35vh", width: "100%" }}
              events={planItems}
              iteneraryIconToHover={iteneraryIconToHover}
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
