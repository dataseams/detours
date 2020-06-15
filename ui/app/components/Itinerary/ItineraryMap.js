import React from "react";
import GoogleMapReact from "google-map-react";
import { Box, Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    minWidth: "33px",
    padding: "2px",
    borderColor: theme.palette.primary.main,
    borderRadius: "20%"
  },
  icon: {
    display: "flex",
    flexDirection: "column",
    color: theme.palette.primary.main
  }
}))

const MapIcon = props => {
  const { materialIcon } = props;
  const classes = useStyles();

  return (
    <Box className={classes.iconContainer} border={2}>
      <Icon color="primary">
        {materialIcon}
      </Icon>
    </Box>
  )
};

function middle(nums) {
  return (Math.max(...nums) + Math.min(...nums)) / 2;
}

const ItineraryMap = props => {
  const { containerStyle, events } = props;
  let centerLat = events.edges.map(x => x.node.activity.place.latitude);
  let centerLng = events.edges.map(x => x.node.activity.place.longitude);
  let center = {
    lat: middle(centerLat),
    lng: middle(centerLng)
  };
  let zoom = 12;

  return (
    <div style={containerStyle}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        center={center}
        zoom={zoom}
      >
        {events.edges.map((event, index) => (
          <MapIcon
            key={index}
            lat={event.node.activity.place.latitude}
            lng={event.node.activity.place.longitude}
            materialIcon={event.node.activity.activityType.materialIcon}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}

export default ItineraryMap;
