import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Meta from "../components/Head";
import NavigationBar from "../components/NavigationBar";
import LandingTitle from "../components/LandingTitle";
import SampleItineraries from "../components/SampleItineraries";
import HowItWorks from "../components/HowItWorks";
import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonials";
import Copyright from "../components/Copyright";

// Template code
import ProTip from "../src/ProTip";
import Link from "../src/Link";

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

      {/*here starts the template code*/}
      <Box my={10}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
      </Box>
      <Copyright />
    </div>
  );
}

export default Index;
