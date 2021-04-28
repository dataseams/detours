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
import addDays from "date-fns/addDays";
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
function getDaysAfter(date, amount) {
  return date ? addDays(date, amount) : undefined;
}
const renderDateRangeComponent = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => {
  return (
    <FormControl>
      <LocalizationProvider dateAdapter={DateFnsUtils}>
        <StaticDateRangePicker
          disablePast
          label={label}
          error={touched && error}
          helperText={touched && error}
          {...input}
          {...custom}
          value={[input.value[0] || null, input.value[1] || null]}
          maxDate={getDaysAfter(input.value[0], 13)}
          displayStaticWrapperAs="mobile"
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <DateRangeDelimiter> to </DateRangeDelimiter>
              <TextField {...endProps} />
            </React.Fragment>
          )}>
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
