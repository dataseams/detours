import React from "react";
import { makeStyles } from "@material-ui/core";
import { Provider } from "react-redux";
import { createStore } from "redux";

import Meta from "../components/Head";
import LogoNavigationBar from "../components/LogoNavigationBar";
import QuestionnaireMain from "../components/QuestionnaireMain";
import { questions } from "../components/QuestionBank";
import QuestionnaireReducer from "../components/QReducers";

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

const store = createStore(QuestionnaireReducer);

function Survey() {
  const classes = useStyles();

  return (
    <div>
      <Meta />
      <LogoNavigationBar />
      <Provider store={store}>
        <div className={classes.surveyPage}>
          <QuestionnaireMain
            questions={questions}
            classes={classes}
            handleChange={QuestionnaireReducer}
          />
        </div>
      </Provider>
    </div>
  );
}

export default Survey;
