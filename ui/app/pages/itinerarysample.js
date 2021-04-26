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
import { itineraryReducer } from "../redux/reducers";
import laData from "../static/laitinerary.json";
import nycData from "../static/nycitinerary.json";
import chiData from "../static/chiitinerary.json";
import sfData from "../static/sfitinerary.json";

const data = {
  LA: laData.data,
  NYC: nycData.data,
  CHI: chiData.data,
  SF: sfData.data,
};

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
  const city = router.query.city;

  return (
    <Provider store={store}>
      <div>
        <Meta />
        <div>
          <LogoNavigationBar />
          <Container className={classes.root}>
            <ItineraryDescription
              fullItinerary={data[city].getLastTripPlanForSurveyResponse}
              isMobile={isMobile}
            />
            <DailyTabs
              plan={data[city].getLastTripPlanForSurveyResponse.dailyPlans}
              isMobile={isMobile}
            />
          </Container>
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
