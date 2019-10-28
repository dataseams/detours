import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import { addCity } from "./QActions";

const cities = [
  { value: "Paris", label: "Paris, France" },
  { value: "SF", label: "San Francisco, CA" },
  { value: "LA", label: "Los Angeles, CA" },
  { value: "Habana", label: "Habana, Cuba" },
  { value: "Other", label: "Other" }
];

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "500px",
    minWidth: "300px"
  }
}));

function AddCity({ dispatch }) {
  const classes = useStyles();

  return (
    <Select
      className={classes.root}
      options={cities}
      value={""}
      onChange={e => {
        dispatch(addCity(e.target.value));
      }}
    >
    {cities.map(city => (
      <MenuItem key={city.value} value={city.value}>
        {city.label}
      </MenuItem>
    ))}
    </Select>
  );
}
AddCity = connect()(AddCity);

export default AddCity;
