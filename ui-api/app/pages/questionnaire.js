import React from "react";
import { Provider, useSelector } from "react-redux";
import { createStore } from "redux";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";

import Meta from "../components/Head";
import LogoNavigationBar from "../components/LogoNavigationBar";
import { questionnaireReducer } from "../redux/reducers";
import CREATE_PLAN_MUTATION from "../utils/queries/CreatePlan";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "left",
    width: "50%"
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

const store = createStore(questionnaireReducer);

function SurveyWithoutRedux() {
  const classes = useStyles();
  const QuestionnaireForm = require(
    "../components/Questionnaire/QuestionnaireForm"
  ).default;
  const router = useRouter();
  const [createPlan, { data }] = useMutation(CREATE_PLAN_MUTATION);
  const travelerEmail = useSelector(state => state.user.email) || "";

  return (
    <div>
      <Meta />
      <LogoNavigationBar />
      <div className={classes.surveyPage}>
        <QuestionnaireForm classes={classes} onSubmit={
          values => createPlan({
            variables: {
              travelerEmail: "", json: JSON.stringify(values, null, 2)
            }
          }).then(res => {
            router.push("/itinerary?surveyId=".concat(
              res.data.createPlanForSurveyResponse.surveyResponse.id
            ))
          }).catch(e => console.log(e))
        } />
      </div>
    </div>
  );
}

function Survey() {
  return (
    <Provider store={store}>
      <SurveyWithoutRedux />
    </Provider>
  )
}

export default Survey;
