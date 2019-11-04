import React from "react";
import { Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { createStore } from "redux";
import { connect } from "react-redux";

// Action
const UPDATE_CITY = "UPDATE_CITY";
function updateCity(text) {
  return { type: UPDATE_CITY, text };
}

// Reducer
function cities(state = {}, action) {
  switch (action.type) {
    case UPDATE_CITY:
      return {
        city: action.text
      };
    default:
      return state;
  }
}

const store = createStore(cities);
console.log(store.getState());
const unsubscribe = store.subscribe(() => console.log(store.getState()));
store.dispatch(updateCity("Hak el city"));

// map state to props
function mapStateToProps(state) {
  const { city } = state;

  return {
    value: city
  };
}

// map dispatch to props
const mapDispatchToProps = dispatch => {
  console.log("Dispatch time");
  return {
    onChange: value => dispatch(updateCity(value))
  };
};

// css styles
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexGrow: 1,
    width: "450px",
    height: "40px",
    margin: "40px"
  }
}));

const ListOfCities = [
  { label: "Paris", value: "Paris" },
  { label: "Barcelona", value: "Barcelona" }
];

function Cities({ updateCity }) {
  const classes = useStyles();

  return (
    <div>
      <Select
        className={classes.root}
        variant="outlined"
        value=""
        onChange={updateCity}
      >
        {ListOfCities.map(city => (
          <MenuItem key={city.value} value={city.value}>
            {city.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

connect(
  mapStateToProps,
  mapDispatchToProps
)(Cities);

export default Cities;

unsubscribe();
