import React from "react";
import { reduxForm } from "redux-form";

import { QuestionComp, questionnaireLength } from "./QuestionBank";
import { Back, Next, Submit } from "../Buttons";

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    "city",
    "companion",
    "dining",
    "travelDates",
    "generalPreferences",
  ];
  requiredFields.forEach((field) => {
   
  
    if (!values || !values[field]) {
      errors[field] = "Required";
    } else if (
      field === "travelDates" &&
      values["travelDates"].includes(null)
    ) {
      errors[field] = "Required";
    }
    else if(
      field === "generalPreferences"  && (Object.values(values["generalPreferences"]).includes(false))  )
    {
      const obj = values["generalPreferences"]
      for (var key in obj) {
        if (obj[key] === false) delete obj[key];
    }
      console.log("obj",values["generalPreferences"])
      console.log("condition",Object.values(values["generalPreferences"]))
      errors[field] = "Required";

    }
  });
 
  return errors;
};

class QuestionnaireForm extends React.Component {
  constructor(props) {
    super(props);
    const errors = validate();
    this.state = {
      index: 1,
      hiddenNext: false,
      disabledBack: true,
    };
  }

  toggleBack(e) {
    let index = this.state.index - 1;
    let disabledBack = index === 1;

    this.setState({
      index: index,
      disabledBack: disabledBack,
      hiddenNext: false,
    });
  }

  toggleNext(e) {
    let index = this.state.index + 1;
    let hiddenNext = index === questionnaireLength;

    this.setState({
      index: index,
      hiddenNext: hiddenNext,
      disabledBack: false,
    });
  }

  render() {
    const { handleSubmit, pristine, submitting, classes, invalid } = this.props;
    const { index, hiddenNext, disabledBack } = this.state;
    console.log(this.props,"invalid")
    return (
      <form onSubmit={handleSubmit} className={classes.root}>
        <div>
          <QuestionComp index={index} handleChange={this.props.handleChange} />
        </div>
        <div className={classes.surveyButtons}>
          <Back toggle={(e) => this.toggleBack(e)} active={disabledBack} />
          <Next
            toggle={(e) => this.toggleNext(e)}
            hidden={hiddenNext}
            disable={invalid}
          />
          <Submit
            type="submit"
            hidden={hiddenNext}
            disabled={pristine || submitting}
          />
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: "questionnaire",
  validate,
})(QuestionnaireForm);
