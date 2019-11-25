import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%"
};

const MyMap = props => {
  return (
    <div>
      <h1>This is a google map.</h1>
      <Map
        google={props.google}
        zoom={11}
        style={mapStyles}
        initialCenter={{ lat: 33.889, lng: -118.1489 }}
      >
        <Marker position={{ lat: 33.9, lng: -118.0 }} />
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MyMap);
