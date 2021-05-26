import React from "react";
import GoogleMapReact from "google-map-react";
import { Box, Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    minWidth: "40px",
    padding: "3px",
    borderColor: theme.palette.primary.main,
    borderRadius: "20%",
    "&:hover": {
      borderColor: "red",
    },
  },
  icon: {
    color: theme.palette.primary.main,
  },
}));

const MapIcon = (props) => {
  const { materialIcon } = props;
  const classes = useStyles();

  return (
    <Box className={classes.iconContainer} border={2}>
      <Icon className={classes.icon}>{materialIcon}</Icon>
    </Box>
  );
};

function middle(nums) {
  return (Math.max(...nums) + Math.min(...nums)) / 2;
}

const ItineraryMap = (props) => {
  const { containerStyle, events } = props;
  let centerLat = events.edges.map((x) => x.node.activity.place.latitude);
  let centerLng = events.edges.map((x) => x.node.activity.place.longitude);
  let center = {
    lat: middle(centerLat),
    lng: middle(centerLng),
  };
  let zoom = 11;
  const lineSymbol = {
    path: "M 0,-1 0,1",
    strokeOpacity: 1,
    scale: 3,
    strokeColor: "#5865BC",
  };
  const handleApiLoaded = (map, maps, pathToDrawPolyLine) => {
    const connectPolyline = new maps.Polyline({
      path: pathToDrawPolyLine,
      geodesic: false,
      strokeOpacity: 0,
      icons: [
        {
          icon: lineSymbol,
          offset: "0",
          repeat: "20px",
        },
      ],
    });
    connectPolyline.setMap(map);
  };
  const pathToDrawPolyLine = events.edges.map((event, index) => ({
    lat: event.node.activity.place.latitude,
    lng: event.node.activity.place.longitude,
  }));
  return (
    <div style={containerStyle}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        center={center}
        zoom={zoom}
        onGoogleApiLoaded={({ map, maps }) =>
          handleApiLoaded(map, maps, pathToDrawPolyLine)
        }
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
};

export default ItineraryMap;
