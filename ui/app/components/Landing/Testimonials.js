import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  MobileStepper
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import SwipeableViews from "react-swipeable-views";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(10, 15),
    fontSize: theme.typography.fontSize,
    color: theme.typography.color
  },
  testimonialsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: theme.spacing(0, -2)
  },
  card: {
    display: "flex",
    flexDirection: "column",
    width: 300,
    background: "none",
    boxShadow: "none"
  },
  gridQuote: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  h2: {
    ...theme.h2.desktop
  },
  body: {
    ...theme.body
  },
  media: {
    height: "150px",
    clipPath: "circle(45px at center)",
    objectFit: "contain"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2, 2)
  },
  quote: {
    padding: theme.spacing(2, 0)
  },
  signature: {
    fontStyle: "italic",
    padding: theme.spacing(2, 0, 0, 0),
    color: theme.typography.color
  }
}));

const useMobileStyles = makeStyles(theme => ({
  root: {
    fontSize: theme.typography.fontSize,
    color: theme.typography.color,
    padding: theme.mainContainer.mobile.padding
  },
  card: {
    display: "flex",
    flexDirection: "column",
    background: "none",
    boxShadow: "none"
  },
  gridQuote: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1
  },
  h2: {
    ...theme.h2.mobile
  },
  body: {
    ...theme.body
  },
  media: {
    height: "150px",
    clipPath: "circle(45px at center)",
    objectFit: "contain"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2, 0)
  },
  quote: {
    padding: theme.spacing(2)
  },
  signature: {
    fontStyle: "italic",
    color: theme.typography.color
  }
}));

const userTestimonials = [
  { name: "Kathleen Brown", image: "/static/kathleen.png", quote: "This travel agent and concierge rolled into one will construct a highly detailed itinerary for you that includes the best restaurants, sights, and events for your trip." },
  { name: "Kathleen Brown", image: "/static/kathleen.png", quote: "This travel agent and concierge rolled into one will construct a highly detailed itinerary for you that includes the best restaurants, sights, and events for your trip." },
  { name: "Kathleen Brown", image: "/static/kathleen.png", quote: "This travel agent and concierge rolled into one will construct a highly detailed itinerary for you that includes the best restaurants, sights, and events for your trip." }
];

function Testimonial(props) {
  const { classes, step, index } = props;
  return (
    <Card key={index} className={classes.card}>
      <CardMedia
        className={classes.media}
        image={step.image}
        title={step.name}
        component="img"
      />
      <CardContent className={classes.content}>
        <Grid className={classes.gridQuote}>
          <img src="/static/left_quotes.svg" className={classes.quote}></img>
          <Typography className={classes.body}>
            {step.quote}
          </Typography>
          <img src="/static/right_quotes.svg" className={classes.quote}></img>
          <Typography className={classes.signature}>
            {step.name}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  )
};

const StyledMobileStepper = withStyles(theme => ({
  root: {
    color: theme.typography.color
  },
  dot: {
    backgroundColor: theme.palette.secondary.dark,
    width: "17px",
    height: "17px",
    margin: "5px"
  },
  dotActive: {
    backgroundColor: theme.palette.primary.main
  }
}))(MobileStepper);

function Testimonials(props) {
  const { isMobile } = props;
  const classes = isMobile ? useMobileStyles() : useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = userTestimonials.length;
  const handleStepChange = (step) => {
    setActiveStep(step)
  };

  return (
    isMobile ? (
      <Box className={classes.root}>
        <Typography className={classes.h2}>
          What our customers say
        </Typography>
        <SwipeableViews index={activeStep} onChangeIndex={handleStepChange}>
          {userTestimonials.map((step, index) => (
            <Testimonial key={index} classes={classes} step={step} index={index} />
          ))}
        </SwipeableViews>
        <StyledMobileStepper
          steps={maxSteps}
          position="static"
          variant="dots"
          activeStep={activeStep}
          nextButton={
            <div />
          }
          backButton={
            <div />
          }
        />
      </Box >
    ) : (
        <Box className={classes.root}>
          <Grid className={classes.h2}>
            <Typography className={classes.h2}>
              What our customers say
              </Typography>
          </Grid>
          <Grid className={classes.testimonialsContainer}>
            {userTestimonials.map((step, index) => (
              <Testimonial key={index} classes={classes} step={step} index={index} />
            ))}
          </Grid>
        </Box>
      )
  );
}

export default Testimonials;
