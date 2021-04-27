import { Field } from "redux-form";

import { StyledRadio } from "./styles/radio";
import renderRadioButton from "./RadioButton";

const companionOptions = [
  { label: "Solo", value: "solo" },
  { label: "Significant other", value: "significant other" },
  { label: "Friend", value: "friend" },
  { label: "Group", value: "group" },
  { label: "Family with kids", value: "family with kids" },
  { label: "Other", value: "other" },
];

const CompanionField = (props) => {
  const { classes } = props;

  return (
    <Field
      name="companion"
      classes={classes}
      component={renderRadioButton}
      options={companionOptions}
    />
  );
};

export default CompanionField;
