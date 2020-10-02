import React from "react";
import { Container } from "@material-ui/core";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/styles";

import Meta from "../components/Head";
import LogoNavigationBar from "../components/LogoNavigationBar";
import ItineraryDescription from "../components/Itinerary/Description";
import DailyTabs from "../components/Itinerary/Days";
import PurchaseBox from "../components/Itinerary/PurchaseBox";
import { itineraryReducer } from "../redux/reducers";
import data from "../static/ItinerarySamples";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(10),
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center"
  }
}));

const useMobileStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(1),
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center"
  }
}));

const store = createStore(itineraryReducer);

function Itinerary(props) {
  const { isMobile } = props;
  const router = useRouter();
  const classes = isMobile ? useMobileStyles() : useStyles();
  const variables = { "cityCode": router.query.city };

  return (
    <Provider store={store}>
      <div>
        <Meta />
        <div>
          <LogoNavigationBar />
          <Container className={classes.root}>
            <ItineraryDescription
              fullItinerary={data.getLastTripPlanForSurveyResponse}
              isMobile={isMobile}
            />
            <DailyTabs
              plan={data.getLastTripPlanForSurveyResponse.dailyPlans}
              isMobile={isMobile}
            />
            <PurchaseBox />
          </Container>
        </div>
      </div>
    </Provider>
  );
};

class ItineraryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 800
    }
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
    this.setState(() => {
      return { width: window.innerWidth }
    })
  }

  render() {
    return (
      <Itinerary isMobile={this.state.width <= 500} />
    )
  }
}

export default ItineraryClass;
