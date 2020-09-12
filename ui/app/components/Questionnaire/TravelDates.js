import React from "react";
import { Field } from "redux-form";
import {
  FormControl,
  InputLabel,
  FormHelperText,
  TextField
} from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  LocalizationProvider,
  StaticDateRangePicker,
  DateRangeDelimiter
} from "@material-ui/pickers";

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

const renderDateRangeComponent = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
  const [value, setValue] = React.useState([null, null]);

  return (
    <FormControl>

      <LocalizationProvider dateAdapter={DateFnsUtils}>
        <StaticDateRangePicker
          label={label}
          error={touched && error}
          helperText={touched && error}
          {...input}
          {...custom}
          displayStaticWrapperAs="mobile"
          value={value}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <DateRangeDelimiter> to </DateRangeDelimiter>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
      {renderFromHelper({ touched, error })}
    </FormControl >
  )
}

const TravelDatesField = props => {
  const { classes } = props;

  return (
    <Field
      name="travelDates"
      classes={classes}
      component={renderDateRangeComponent}
    ></Field>
  );
};

export default TravelDatesField;
