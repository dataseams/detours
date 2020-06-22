import React from "react";
import Container from "@material-ui/core/Container";

import Meta from "../components/Head";
import NavigationBar from "../components/Landing/NavigationBar";
import LandingTitle from "../components/Landing/LandingTitle";
import SampleItineraries from "../components/Landing/SampleItineraries";
import HowItWorks from "../components/Landing/HowItWorks";
import Pricing from "../components/Landing/Pricing";
import Testimonials from "../components/Landing/Testimonials";
import Copyright from "../components/Landing/Copyright";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 800
    };
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
    this.setState(() => {
      return { width: window.innerWidth }
    })
  }

  render() {
    return (
      <div>
        <Meta />
        <NavigationBar />
        <Container maxWidth="xl" component="div" disableGutters={this.state.width <= 500}>
          <LandingTitle isMobile={this.state.width <= 500} />
          <SampleItineraries isMobile={this.state.width <= 500} />
          <HowItWorks isMobile={this.state.width <= 500} />
          <Pricing isMobile={this.state.width <= 500} />
          <Testimonials isMobile={this.state.width <= 500} />
        </Container>
        <Copyright />
      </div>
    );
  }
}

export default Index;
