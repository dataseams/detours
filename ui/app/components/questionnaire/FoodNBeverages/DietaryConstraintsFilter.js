import { Field } from "redux-form";

import renderRadioButton from "../RadioButton";

const dietaryConstraintFilterOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" }
];

const DietaryConstraintFilterField = props => {
  const { classes } = props;

  return (
    <Field
      name="dining.dietaryConstraintsFilter"
      classes={classes}
      component={renderRadioButton}
      options={dietaryConstraintFilterOptions}
    />
  );
};

export default DietaryConstraintFilterField;
