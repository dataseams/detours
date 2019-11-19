import React from "react";
import { Select, InputLabel, FormControl, MenuItem } from "@material-ui/core";
import { Field } from "redux-form";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import renderFormHelper from "./RenderFormHelper";

const genderOptions = [
  { value: "Female", label: "Female" },
  { value: "Male", label: "Male" },
  { value: "Other", label: "Other" }
];

const useStyles = makeStyles(theme => ({
  root: {
    display: "inline",
    flexWrap: "wrap",
    width: "100%"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "45%",
    maxWidth: "90%"
  }
}));

const renderAgeText = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => {
  const customClasses = useStyles();

  return (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      className={customClasses.textField}
      InputLabelProps={{
        shrink: true
      }}
      value=""
      margin="normal"
      variant="outlined"
      type="number"
      {...input}
      {...custom}
    />
  );
};

const renderGenderText = ({
  label,
  input,
  meta: { touched, invalid, error },
  children,
  ...custom
}) => {
  const customClasses = useStyles();

  return (
    <TextField
      label={label}
      select
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      className={customClasses.textField}
      InputLabelProps={{
        shrink: true
      }}
      margin="normal"
      variant="outlined"
      {...input}
      {...custom}
    >
      {genderOptions.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

const AgeGenderField = props => {
  const { classes } = props;
  const customClasses = useStyles();

  return (
    <div className={customClasses.root}>
      <Field
        name="age"
        component={renderAgeText}
        label="Age"
      />
      <Field
        name="gender"
        label="Gender"
        component={renderGenderText}
      >
        {genderOptions.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Field>
    </div>
  );
};

export default AgeGenderField;
