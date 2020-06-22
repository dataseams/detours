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
    padding: theme.spacing(10)
  },
  mainGrid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  gridL1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  card: {
    padding: theme.spacing(2, 2, 2, 2),
    display: "flex",
    flexDirection: "column",
    width: 300,
    margin: theme.spacing(1),
    background: "none",
    boxShadow: "none"
  },
  gridL3: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1
  },
  title: {
    fontWeight: "bold",
    padding: theme.spacing(0, 0, 0, 2)
  },
  media: {
    height: "150px",
    clipPath: "circle(45px at center)",
    objectFit: "contain"
  },
  content: {
    height: 40,
    padding: 10
  },
  quote: {
    padding: theme.spacing(2)
  },
  signature: {
    fontStyle: "italic",
    padding: theme.spacing(2, 0, 0, 0)
  }
}));

const useMobileStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    fontSize: 18
  },
  card: {
    display: "flex",
    flexDirection: "column",
    background: "none",
    boxShadow: "none"
  },
  gridL3: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1
  },
  title: {
    fontSize: "1.22em",
    fontWeight: "bold"
  },
  media: {
    height: "150px",
    clipPath: "circle(45px at center)",
    objectFit: "contain"
  },
  content: {
    height: 40,
    padding: 10
  },
  quote: {
    padding: theme.spacing(2)
  },
  signature: {
    fontStyle: "italic",
    padding: theme.spacing(2, 0, 0, 0)
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
      <CardContent>
        <Grid className={classes.gridL3}>
          <img src="/static/left_quotes.svg" className={classes.quote}></img>
          <Typography>
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
    padding: theme.spacing(0, 0, 2, 0)
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
        <Typography className={classes.title}>
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
          <Grid className={classes.mainGrid}>
            <Grid className={classes.title}>
              <Typography className={classes.title}>
                What our customers say
              </Typography>
            </Grid>
            <Grid className={classes.gridL1}>
              {userTestimonials.map((step, index) => (
                <Testimonial key={index} classes={classes} step={step} index={index} />
              ))}
            </Grid>
          </Grid>
        </Box>
      )
  );
}

export default Testimonials;
