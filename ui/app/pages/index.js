import React from "react";
import { Container } from "@material-ui/core";
import { Provider, useSelector } from "react-redux";
import { createStore, combineReducers } from "redux";

import Meta from "../components/Head";
import NavigationBar from "../components/Landing/NavigationBar";
import LandingTitle from "../components/Landing/LandingTitle";
import SampleItineraries from "../components/Landing/SampleItineraries";
import HowItWorks from "../components/Landing/HowItWorks";
import Pricing from "../components/Landing/Pricing";
import Testimonials from "../components/Landing/Testimonials";
import Copyright from "../components/Landing/Copyright";

const initialUserState = {
  email: null,
  displayName: null,
  photoUrl: null,
};
const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        email: action.value.userEmail,
        displayName: action.value.userDisplayName,
        photoUrl: action.value.userPhotoUrl,
      };
    default:
      return state;
  }
};
const userReducers = combineReducers({
  user: userReducer,
});
const store = createStore(userReducers);

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null,
    };
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  componentDidMount() {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.handleWindowSizeChange);
      this.setState(() => {
        return { width: window.innerWidth };
      });
    }
  }

  render() {
    return (
      <Provider store={store}>
        {this.state.width ? (
          <>
            <Meta />
            <Container maxWidth="lg" component="div" disableGutters={true}>
              <NavigationBar isMobile={this.state.width <= 500} />
              <LandingTitle isMobile={this.state.width <= 500} />
              <SampleItineraries isMobile={this.state.width <= 500} />
              <HowItWorks isMobile={this.state.width <= 500} />
              <Pricing isMobile={this.state.width <= 500} />
              <Testimonials isMobile={this.state.width <= 500} />
            </Container>
            <Copyright />
          </>
        ) : (
          ""
        )}
      </Provider>
    );
  }
}

export default Index;
