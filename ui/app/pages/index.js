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

function Index() {
  return (
    <div>
      <Meta />
      <NavigationBar />
      <Container maxWidth="xl" component="div">
        <LandingTitle />
        <SampleItineraries />
        <HowItWorks />
        <Pricing />
        <Testimonials />
      </Container>
      <Copyright />
    </div>
  );
}

export default Index;
