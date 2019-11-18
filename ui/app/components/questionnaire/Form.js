import React from "react";
import { reduxForm } from "redux-form";
import { Button } from "@material-ui/core";

import SelectField from "./City";
import TravelDateFields from "./TravelDates";
import { BackButton, NextButton, SubmitButton } from "./Buttons";

const validate = values => {
  const errors = {};
  const requiredFields = ["city"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};

const Form = props => {
  const { handleSubmit, pristine, reset, submitting, classes } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <SelectField classes={classes} />
        <TravelDateFields classes={classes} />
      </div>
      <div>
        <BackButton type="button">Back</BackButton>
        <NextButton type="button">Next</NextButton>
        <SubmitButton type="submit" disabled={pristine || submitting}>
          Submit
        </SubmitButton>
        <Button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear
        </Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "QuestionnaireForm",
  validate
})(Form);
