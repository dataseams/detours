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
  surveyButtons: {
    textAlign: "center",
    padding: theme.spacing(1)
  },
  surveyPage: {
    paddingTop: theme.spacing(25),
    textAlign: "center",
    justifyText: "center",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

var answers = {};

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
    const classes = this.props.classes;

    if (question) {
      return (
        <div className={classes.root}>
          <div>
            <QuestionComp questions={questions} index={index} answers={answers}/>
          </div>
          <div className={classes.surveyButtons}>
            <Back toggle={e => this.toggleBack(e)} active={disabledBack} />
            <Next toggle={e => this.toggleNext(e)} hidden={hiddenNext} />
            <Submit toggle={e => this.toggleNext(e)} hidden={hiddenNext} />
          </div>
        </div>
      );
    } else {
      return <span>error</span>;
    }
  }
}

function Survey() {
  const classes = useStyles();

  return (
    <div>
      <Meta />
      <LogoNavigationBar />
      <div className={classes.surveyPage}>
        <Main questions={questions} classes={classes}/>
      </div>
    </div>
  );
}

export default Survey;
