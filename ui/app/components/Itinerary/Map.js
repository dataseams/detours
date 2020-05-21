import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Box, Paper } from "@material-ui/core";

const AnyReactComponent = props => (
  <Box border={1} borderColor="primary.main" borderRadius="borderRadius">
    <i className="material-icons" style={{ fontSize: "26px", color: "#5865bc" }}>
      restaurant
    </i>
  </Box>
);

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 48.862419,
      lng: 2.341400
    },
    zoom: 13
  };

  render() {
    return (
      <div style={this.props.containerStyle}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={48.874204} lng={2.347704} />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
