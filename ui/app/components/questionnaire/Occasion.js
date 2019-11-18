import { RadioGroup, FormControl, FormControlLabel } from "@material-ui/core";
import { Field } from "redux-form";
import { makeStyles } from "@material-ui/styles";

import { StyledRadio } from "../styles";

const occasionsOptions = [
  { label: "Honeymoon", value: "Honeymoon" },
  { label: "Babymoon", value: "Babymoon" },
  { label: "Anniversary", value: "Anniversary" },
  { label: "Weekend getaway", value: "Weekend getaway" },
  { label: "Business trip", value: "Business trip" },
  { label: "Trip with friends", value: "Trip with friends" },
  { label: "Birthday", value: "Birthday" },
  { label: "Family vacation", value: "Family vacation" },
  { label: "Other", value: "Other" }
];
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  }
}));

const renderRadioButton = ({ input, ...rest }) => {
  const customClasses = useStyles();

  return (
    <FormControl className={customClasses.root}>
      <RadioGroup {...input} {...rest}>
        {occasionsOptions.map((choice, index) => (
          <FormControlLabel
            key={choice.value}
            value={choice.value}
            control={<StyledRadio />}
            label={choice.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

const OccasionField = props => {
  const { classes } = props;

  return (
    <Field name="occasion" classes={classes} component={renderRadioButton}>
      {occasionsOptions.map(option => (
        <StyledRadio
          key={option.value}
          label={option.label}
          value={option.value}
        />
      ))}
    </Field>
  );
};

export default OccasionField;
