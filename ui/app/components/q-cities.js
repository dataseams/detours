import React from "react";
import Select from "react-select";
import { makeStyles, mergeClasses } from "@material-ui/styles";

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

function City() {
  const classes = useStyles();

  const [state, setState] = React.useState({ city: "" });
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  return (
    <Select
      instanceId="cities"
      className={classes.root}
      placeholder="Type or select..."
      options={cityOptions}
    ></Select>
  );
}

export default City;
