import React from "react";
import NativeSelect from "react-select";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import { addCity } from "./QActions";

const cityOptions = [
  { value: "Paris", label: "Paris, France" },
  { value: "SF", label: "San Francisco, CA" },
  { value: "LA", label: "Los Angeles, CA" },
  { value: "Habana", label: "Habana, Cuba" },
  { value: "Other", label: "Other" }
];

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "500px"
  }
}));

function AddCity ({ dispatch }) {
  const classes = useStyles();

  return (
    <NativeSelect
      instanceId="cities"
      className={classes.root}
      placeholder="Type or select..."
      options={cityOptions}
      onChange={e => {
        dispatch(addCity(e.value));
      }}
    ></NativeSelect>
  );
};
AddCity = connect()(AddCity);

export default AddCity;
