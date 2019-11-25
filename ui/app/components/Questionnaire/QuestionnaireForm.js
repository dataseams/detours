import React from "react";
import { reduxForm } from "redux-form";

import QuestionComp from "./QuestionBank";
import { Back, Next, Submit } from "./Buttons";

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

class QuestionnaireForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 1,
      hiddenNext: false,
      disabledBack: true
    };
  }

  toggleBack(e) {
    let index = this.state.index - 1;
    let disabledBack = index === 1;

    this.setState({
      index: index,
      disabledBack: disabledBack,
      hiddenNext: false
    });
  }

  toggleNext(e) {
    let index = this.state.index + 1;
    let hiddenNext = index === 16;

    this.setState({
      index: index,
      hiddenNext: hiddenNext,
      disabledBack: false
    });
  }

  render() {
    const { handleSubmit, pristine, submitting, classes } = this.props;
    const { index, hiddenNext, disabledBack } = this.state;

    return (
      <form onSubmit={handleSubmit} className={classes.root}>
        <div>
          <QuestionComp index={index} handleChange={this.props.handleChange} />
        </div>
        <div className={classes.surveyButtons}>
          <Back toggle={e => this.toggleBack(e)} active={disabledBack} />
          <Next toggle={e => this.toggleNext(e)} hidden={hiddenNext} />
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
  validate
})(QuestionnaireForm);
