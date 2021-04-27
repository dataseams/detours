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

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
    width: "50%",
  },
  surveyButtons: {
    textAlign: "center",
    paddingTop: theme.spacing(5),
  },
  surveyPage: {
    display: "flex",
    paddingTop: theme.spacing(25),
    textAlign: "center",
    justifyText: "center",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const useMobileStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
    width: "80%",
  },
  surveyButtons: {
    display: "flex",
    flexDirection: "column-reverse",
    textAlign: "center",
    paddingTop: theme.spacing(5),
  },
  surveyPage: {
    display: "flex",
    paddingTop: theme.spacing(15),
    textAlign: "center",
    justifyText: "center",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const store = createStore(questionnaireReducer);
const unsubscribe = store.subscribe(() => console.log(store.getState()));

function SurveyWithoutRedux(props) {
  const { isMobile } = props;
  const classes = isMobile ? useMobileStyles() : useStyles();
  const QuestionnaireForm = require("../components/Questionnaire/QuestionnaireForm")
    .default;
  const router = useRouter();
  const [createPlan, { data }] = useMutation(CREATE_PLAN_MUTATION);
  const travelerEmail = useSelector((state) => state.user.email) || "";

  return (
    <div>
      <Meta />
      <LogoNavigationBar />
      <div className={classes.surveyPage}>
        <QuestionnaireForm
          classes={classes}
          onSubmit={(values) =>
            createPlan({
              variables: {
                travelerEmail: "",
                json: JSON.stringify(values, null, 2),
              },
            })
              .then((res) => {
                router.push(
                  "/itinerary?surveyId=".concat(
                    res.data.createPlanForSurveyResponse.surveyResponse.id
                  )
                );
              })
              .catch((e) => console.log(e))
          }
        />
      </div>
    </div>
  );
}

function Survey(props) {
  const { isMobile } = props;

  return (
    <Provider store={store}>
      <SurveyWithoutRedux isMobile={isMobile} />
    </Provider>
  );
}

class SurveyWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 800,
    };
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
    this.setState(() => {
      return { width: window.innerWidth };
    });
  }

  render() {
    return <Survey isMobile={this.state.width <= 500} />;
  }
}

export default SurveyWrapper;
