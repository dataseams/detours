import React from "react";
import { Container } from "@material-ui/core";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/styles";
import Meta from "../components/Head";
import LogoNavigationBar from "../components/LogoNavigationBar";
import ItineraryDescription from "../components/Itinerary/Description";
import DailyTabs from "../components/Itinerary/Days";
import PurchaseBox from "../components/Itinerary/PurchaseBox";
import { itineraryReducer } from "../redux/reducers";
import GET_ITINERARY from "../utils/queries/GetItinerary";
import ContentRemoveCircleOutline from "material-ui/svg-icons/content/remove-circle-outline";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(10),
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
}));

const useMobileStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
}));

const store = createStore(itineraryReducer);

function Itinerary(props) {
  const { isMobile } = props;
  const router = useRouter();
  const classes = isMobile ? useMobileStyles() : useStyles();
  const variables = { surveyResponseNodeId: router.query.surveyId };
  const { loading, error, data } = useQuery(GET_ITINERARY, {
    variables: variables,
  });
  const paymentStatus =
    data?.getLastTripPlanForSurveyResponse?.surveyResponse?.paymentStatus;
  return (
    <Provider store={store}>
      <div>
        <Meta />
        <div>
          <LogoNavigationBar />
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Container className={classes.root}>
              <ItineraryDescription
                fullItinerary={data.getLastTripPlanForSurveyResponse}
                isMobile={isMobile}
              />
              <DailyTabs
                plan={data.getLastTripPlanForSurveyResponse.dailyPlans}
                isMobile={isMobile}
                paymentStatus={paymentStatus}
              />
              <PurchaseBox paymentStatus={paymentStatus} />
            </Container>
          )}
        </div>
      </div>
    </Provider>
  );
}

class ItineraryClass extends React.Component {
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
    return <Itinerary isMobile={this.state.width <= 500} />;
  }
}

export default ItineraryClass;
