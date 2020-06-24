import React from "react";
import { Field } from "redux-form";
import {
  FormControl,
  InputLabel,
  FormHelperText,
  Grid
} from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

const renderDateComponent = ({
  input,
  label,
  meta: { touched, invalid, error },
  children,
  ...custom
}) => {
  return (
    <FormControl error={touched && error}>
      <InputLabel htmlFor="city">{label}</InputLabel>
      <KeyboardDatePicker
        label={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
        disableToolbar
        margin="normal"
        variant="inline"
        format="MM/dd/yyyy"
      >
        {children}
      </KeyboardDatePicker>
      {renderFromHelper({ touched, error })}
    </FormControl>
  );
};

const TravelDateFields = props => {
  const { classes } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Field
            name="arrivalDate"
            classes={classes}
            component={renderDateComponent}
          ></Field>
        </Grid>
        <Grid item xs={6}>
          <Field
            name="returnDate"
            classes={classes}
            component={renderDateComponent}
          ></Field>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default TravelDateFields;
