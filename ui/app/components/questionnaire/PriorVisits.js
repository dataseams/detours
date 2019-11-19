import { Field } from "redux-form";

import { StyledRadio } from "../styles";
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
    >
      {priorVisitOptions.map((choice, index) => (
        <StyledRadio
          key={choice.value}
          label={choice.label}
          value={choice.value}
        />
      ))}
    </Field>
  );
};

export default PriorVisitsField;
