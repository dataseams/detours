import React from "react";
import { Field } from "redux-form";
import {
  FormControl,
  FormHelperText,
  TextField,
  makeStyles,
} from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  LocalizationProvider,
  StaticDateRangePicker,
  DateRangeDelimiter,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
}));

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
  children,
  ...custom
}) => {
  const [value, setValue] = React.useState([null, null]);
  const todaysDate = new Date();

  return (
    <FormControl>
      <LocalizationProvider dateAdapter={DateFnsUtils}>
        <StaticDateRangePicker
          label={label}
          error={touched && error}
          helperText={touched && error}
          {...input}
          {...custom}
          value={value}
          minDate={todaysDate}
          displayStaticWrapperAs="mobile"
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <DateRangeDelimiter> to </DateRangeDelimiter>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        >
          {children}
        </StaticDateRangePicker>
      </LocalizationProvider>
      {renderFromHelper({ touched, error })}
    </FormControl>
  );
};

const TravelDatesField = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Field name="travelDates" component={renderDateRangeComponent}></Field>
    </div>
  );
};

export default TravelDatesField;
