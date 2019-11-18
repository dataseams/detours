import React from "react";
import { reduxForm } from "redux-form";

import { questions, QuestionComp } from "../components/QuestionBank";
import { Back, Next, Submit } from "../components/questionnaire/Buttons";

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
      index: 0,
      hiddenNext: false,
      disabledBack: true
    };
  }

  toggleBack(e) {
    let index = this.state.index - 1;
    let disabledBack = index === 0;

    this.setState({
      index: index,
      disabledBack: disabledBack,
      hiddenNext: false
    });
  }

  toggleNext(e) {
    let index = this.state.index + 1;
    let hiddenNext = index === this.props.questions.length - 1;

    this.setState({
      index: index,
      hiddenNext: hiddenNext,
      disabledBack: false
    });
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, classes } = this.props;
    const { index, hiddenNext, disabledBack } = this.state;
    const question = this.props.questions ? this.props.questions[index] : null;

    if (question) {
      return (
        <form onSubmit={handleSubmit} className={classes.root}>
          <div>
            <QuestionComp
              questions={questions}
              index={index}
              handleChange={this.props.handleChange}
            />
          </div>
          <div className={classes.surveyButtons}>
            <Back toggle={e => this.toggleBack(e)} active={disabledBack} />
            <Next toggle={e => this.toggleNext(e)} hidden={hiddenNext} />
            <Submit
              toggle={e => this.toggleNext(e)}
              hidden={true}
              disabled={pristine || submitting}
              onClick={reset}
            />
          </div>
        </form>
      );
    } else {
      return <span>error</span>;
    }
  }
}

export default reduxForm({
  form: "Questionnaire",
  validate
})(QuestionnaireForm);
