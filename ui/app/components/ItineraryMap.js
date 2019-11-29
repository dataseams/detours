import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Box } from "@material-ui/core";
import { makeStyle, makeStyles } from "@material-ui/styles";

const AnyReactComponent = props => (
  <Box border={1} borderColor="primary.main" borderRadius="borderRadius">
    <i class="material-icons" style={{ fontSize: "30px", color: "#5865bc" }}>
      restaurant
    </i>
  </Box>
);

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      <div style={this.props.containerStyle}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} text="MARC" />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
