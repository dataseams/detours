import React from "react";
import { reduxForm } from "redux-form";
import { QuestionComp, questionnaireLength } from "./QuestionBank";
import { Back, Next, Submit } from "../Buttons";
import { connect } from "react-redux";

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
    if (!values[field]) {
      errors[field] = "Required";
    } else if (
      field === "travelDates" &&
      values["travelDates"].includes(null)
    ) {
      errors[field] = "Required";
    } else if (
      field === "generalPreferences" &&
      !Object.values(values["generalPreferences"]).some((val) => val === true)
    ) {
      errors[field] = "Required";
    }
  });
  return errors;
};

class QuestionnaireForm extends React.Component {
  constructor(props) {
    super(props);

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
  isNextButtonDisabled(invalid, index, requiredFields) {
    if (invalid) {
      return true;
    } else if (
      index === 4 &&
      requiredFields.generalPreferences === "Required"
    ) {
      return true;
    } else {
      return false;
    }
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
    const {
      handleSubmit,
      pristine,
      submitting,
      classes,
      invalid,
      form,
    } = this.props;
    const { index, hiddenNext, disabledBack } = this.state;
    const requiredFields = form.questionnaire.syncErrors;
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
            disable={this.isNextButtonDisabled(invalid, index, requiredFields)}
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
function mapStateToProps(state) {
  return state;
}
QuestionnaireForm = connect(mapStateToProps)(QuestionnaireForm);
export default reduxForm({
  form: "questionnaire",
  validate,
})(QuestionnaireForm);
