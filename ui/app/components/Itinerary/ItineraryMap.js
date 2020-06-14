import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Box } from "@material-ui/core";

const AnyReactComponent = props => {
  const { materialIcon } = props;
  return (
    <Box border={1} borderColor="primary.main" borderRadius="5%">
      <i className="material-icons" style={{ fontSize: "26px", color: "#5865bc" }}>
        {materialIcon}
      </i>
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
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {events.edges.map((event, index) => (
          <AnyReactComponent
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
