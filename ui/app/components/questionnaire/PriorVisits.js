import { Field } from "redux-form";

import { StyledRadio } from "./styles/radio";
import renderRadioButton from "./RadioButton";

const priorVisitOptions = [
  { label: "Never", value: "never" },
  { label: "One time", value: "one time" },
  { label: "Many times", value: "many times" }
];

const PriorVisitsField = props => {
  const { classes } = props;

  return (
    <Field
      name="priorvisits"
      classes={classes}
      component={renderRadioButton}
      options={priorVisitOptions}
    />
  );
};

export default PriorVisitsField;
