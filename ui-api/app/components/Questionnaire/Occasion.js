import { Field } from "redux-form";

import renderRadioButton from "./RadioButton";

const occasionsOptions = [
  { label: "Honeymoon", value: "honeymoon" },
  { label: "Babymoon", value: "babymoon" },
  { label: "Anniversary", value: "anniversary" },
  { label: "Weekend getaway", value: "weekend getaway" },
  { label: "Business trip", value: "business trip" },
  { label: "Trip with friends", value: "trip with friends" },
  { label: "Birthday", value: "birthday" },
  { label: "Family vacation", value: "family vacation" },
  { label: "Other", value: "other" }
];

const OccasionField = props => {
  const { classes } = props;

  return (
    <Field
      name="occasion"
      classes={classes}
      component={renderRadioButton}
      options={occasionsOptions}
    />
  );
};

export default OccasionField;
