import React from "react";
import { makeStyles } from "@material-ui/core";

import Meta from "../components/Head";
import LogoNavigationBar from "../components/LogoNavigationBar";
import { questions, QuestionComp } from "../components/QuestionBank";
import { Back, Next, Submit } from "../components/QuestionnaireButtons";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "left",
    width: "45%"
  },
  buttonsContainer: {
    textAlign: "center",
    padding: theme.spacing(1)
  }
}));

class Main extends React.Component {
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
    const { index, hiddenNext, disabledBack } = this.state;
    const question = this.props.questions ? this.props.questions[index] : null;

    if (question) {
      return (
        <div className="survey">
          <div>
            <QuestionComp questions={questions} index={index} />
          </div>
          <div className="survey-buttons">
            <Back toggle={e => this.toggleBack(e)} active={disabledBack} />
            <Next toggle={e => this.toggleNext(e)} hidden={hiddenNext} />
            <Submit toggle={e => this.toggleNext(e)} hidden={hiddenNext} />
          </div>
          <style jsx>
            {`
              .survey {
                text-align: left;
                width: 45%;
              }

              .survey-buttons {
                text-align: center;
                padding: 60px 10px 40px 10px;
              }
            `}
          </style>
        </div>
      );
    } else {
      return <span>error</span>;
    }
  }
}

function Survey() {
  return (
    <div>
      <Meta />
      <LogoNavigationBar />
      <div id="survey-1">
        <Main questions={questions} />
      </div>
      <style jsx>
        {`
          #survey-1 {
            padding-top: 150px;
            text-align: center;
            justify-text: center;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
}

export default Survey;
