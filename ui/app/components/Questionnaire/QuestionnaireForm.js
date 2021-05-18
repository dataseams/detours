import React from "react";
import { reduxForm } from "redux-form";
import { QuestionComp, questionnaireLength } from "./QuestionBank";
import { Back, Next, Submit } from "../Buttons";
import { connect } from "react-redux";

const validate = (values) => {
  const errors = {};
  const environment = values && values.dining && values.dining.environment;
  const pricePoint = values && values.dining && values.dining.pricePoint;
  const requiredFields = [
    "city",
    "companion",
    "dining",
    "travelDates",
    "generalPreferences",
  ];
  const countInArray = (array) => {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
      if (array[i] === true) {
        count++;
        if (count === 2) return false;
      }
    }
    return true;
  };
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
      countInArray(Object.values(values["generalPreferences"]))
    ) {
      errors[field] = "Required";
    } else if (
      field === "dining" &&
      (!pricePoint ||
        !environment ||
        (environment &&
          !Object.values(environment).some((val) => val === true)))
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
      disabledSubmit: false,
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
  handleSubmit = () => {
    if (this.state.disabledSubmit) {
      return;
    }
    setTimeout(() => {
      this.setState({ disabledSubmit: true });
    }, 0);
  };
  disableNext(invalid, index, requiredFields) {
    if (requiredFields) {
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
    const { handleSubmit, classes, invalid, form } = this.props;
    const { index, hiddenNext, disabledBack, disabledSubmit } = this.state;
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
            disable={this.disableNext(invalid, index, requiredFields)}
          />
          <Submit
            type="submit"
            hidden={hiddenNext}
            handleSubmit={this.handleSubmit}
            disable={
              disabledSubmit ||
              (requiredFields &&
                Object.values(requiredFields).some((val) => val === "Required"))
            }
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
