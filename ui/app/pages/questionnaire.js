import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import { makeStyles } from "@material-ui/core";

import Meta from "../components/Head";
import LogoNavigationBar from "../components/LogoNavigationBar";
import { questions } from "../components/questionnaire/QuestionBank";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "left",
    width: "45%"
  },
  surveyButtons: {
    textAlign: "center",
    paddingTop: theme.spacing(5)
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

const reducer = combineReducers({
  form: reduxFormReducer
});

const store = createStore(reducer);

const showResults = values =>
  new Promise(resolve => {
    setTimeout(() => {
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
      resolve();
    }, 100);
    console.log(store.getState());
  });

function Survey() {
  const classes = useStyles();
  const QuestionnaireForm = require("../components/QuestionnaireForm").default;

  return (
    <div>
      <Meta />
      <LogoNavigationBar />
      <Provider store={store}>
        <div className={classes.surveyPage}>
          <QuestionnaireForm
            questions={questions}
            classes={classes}
            onSubmit={showResults}
          />
        </div>
      </Provider>
    </div>
  );
}

export default Survey;
