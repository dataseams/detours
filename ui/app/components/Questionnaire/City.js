import React from "react";
import { Select, InputLabel, FormControl } from "@material-ui/core";
import { Field } from "redux-form";
import { makeStyles } from "@material-ui/styles";

import renderFormHelper from "./RenderFormHelper";

const cityOptions = [
  { value: "", label: "" },
  { value: "LA", label: "Los Angeles, CA" },
  { value: "SD", label: "San Diego, CA" },
  { value: "SF", label: "San Francisco, CA" },
  { value: "NYC", label: "New York, NY" },
  { value: "CHI", label: "Chicago, IL" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  select: {
    display: "flex",
    flexGrow: 1,
    height: theme.spacing(7),
    color: theme.typography.color,
  },
}));

const renderCitySelect = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => {
  const customClasses = useStyles();

  return (
    <FormControl error={touched && error} className={customClasses.root}>
      <InputLabel htmlFor="city">{label}</InputLabel>
      <Select
        native
        variant="outlined"
        {...input}
        {...custom}
        inputProps={{
          name: input.name,
          id: "city",
        }}
        className={customClasses.select}
      >
        {children}
      </Select>
      {renderFormHelper({ touched, error })}
    </FormControl>
  );
};

const CitiesField = (props) => {
  const { classes } = props;

  return (
    <Field name="city" classes={classes} component={renderCitySelect}>
      {cityOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Field>
  );
};

export default CitiesField;
