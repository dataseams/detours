import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import { addCity } from "./QActions";
import QuestionnaireReducer from "./QReducers";

const cities = [
  { value: "Paris", label: "Paris, France" },
  { value: "SF", label: "San Francisco, CA" },
  { value: "LA", label: "Los Angeles, CA" },
  { value: "Habana", label: "Habana, Cuba" },
  { value: "Other", label: "Other" }
];

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexGrow: 1,
    maxWidth: "450px",
    height: "40px"
  }
}));

function City(props) {
  const classes = useStyles();

  return (
    <Select
      className={classes.root}
      options={cities}
      value={""}
      variant="outlined"
      onChange={props.handleChange}
    >
    {cities.map(city => (
      <MenuItem key={city.value} value={city.value}>
        {city.label}
      </MenuItem>
    ))}
    </Select>
  );
}

export default City;
