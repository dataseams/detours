import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { reducer as reduxFormReducer, isAsyncValidating } from "redux-form";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core";
import { createApolloFetch } from "apollo-fetch";

import Meta from "../components/Head";
import LogoNavigationBar from "../components/LogoNavigationBar";

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

const reducer = combineReducers({
  form: reduxFormReducer
});

const store = createStore(reducer);

function Survey() {
  const classes = useStyles();
  const QuestionnaireForm = require(
    "../components/Questionnaire/QuestionnaireForm"
  ).default;
  const router = useRouter();
  const graphQlUri = "http://localhost:5000/graphql";
  const query = `
    mutation addSurveyResp($travelerId: Int!, $json: JSONString!) {
      addSurveyResponse(travelerId: $travelerId, json: $json){
        surveyResponse{
          id
          timeStamp
          json
        }
      }
    }
  `;
  const fetch = createApolloFetch({ uri: graphQlUri });

  const showResults = values =>
    new Promise(resolve => {
      setTimeout(() => {
        window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
        resolve();
      }, 1000);

      console.log(store.getState());
      const variables = {
        travelerId: 1, json: JSON.stringify(values, null, 2)
      };
      fetch({ query: query, variables: variables }).then(res => {
        console.log(res.data.addSurveyResponse.surveyResponse.id)
        router.push("/itinerary?surveyId=".concat(
          res.data.addSurveyResponse.surveyResponse.id
          // "U3VydmV5UmVzcG9uc2U6MQ=="
        ));
      });
    });

  return (
    <div>
      <Meta />
      <LogoNavigationBar />
      <Provider store={store}>
        <div className={classes.surveyPage}>
          <QuestionnaireForm classes={classes} onSubmit={showResults} />
        </div>
      </Provider>
    </div>
  );
}

export default Survey;
