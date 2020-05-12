import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core";
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";

import Meta from "../components/Head";
import LogoNavigationBar from "../components/LogoNavigationBar";
import { questionnaireReducer } from "../redux/reducers";

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

function Survey() {
  const classes = useStyles();
  const QuestionnaireForm = require(
    "../components/Questionnaire/QuestionnaireForm"
  ).default;
  const router = useRouter();
  const graphQlUri = process.env.CORE_API_URL;
  const client = new ApolloClient({
    uri: graphQlUri,
  });
  const CREATE_PLAN = gql`
    mutation createPlanForSurveyResp($travelerEmail: String!, $json: JSONString!) {
      createPlanForSurveyResponse(travelerEmail: $travelerEmail, json: $json){
        surveyResponse{
          id
          timeStamp
          json
        }
      }
    }
  `;

  const showResults = values => {
    const variables = {
      travelerEmail: "", json: JSON.stringify(values, null, 2)
    };
    client.mutate(
      {
        mutation: CREATE_PLAN,
        variables: variables
      }
    ).then(res => {
      router.push("/itinerary?surveyId=".concat(
        res.data.createPlanForSurveyResponse.surveyResponse.id
        // "U3VydmV5UmVzcG9uc2U6MQ=="
      ));
    });
  };

  return (
    <Provider store={store}>
      <div>
        <Meta />
        <LogoNavigationBar />
        <div className={classes.surveyPage}>
          <QuestionnaireForm classes={classes} onSubmit={showResults} />
        </div>
      </div>
    </Provider>
  );
}

export default Survey;
