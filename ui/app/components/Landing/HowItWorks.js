import {
  Box,
  Grid,
  Card,
  Typography,
  CardMedia,
  CardContent,
  MobileStepper
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import SwipableViews from "react-swipeable-views";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "center",
    backgroundColor: theme.palette.secondary.light
  },
  title: {
    alignSelf: "flex-start",
    paddingLeft: theme.spacing(5),
    fontWeight: "bold"
  },
  subtitle: {
    padding: theme.spacing(1, 1, 1, 1)
  },
  text: {
    padding: theme.spacing(1, 1, 1, 1)
  },
  mainGrid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3)
  },
  grid: {
    display: "flex",
    flexGrow: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center"
  },
  card: {
    display: "flex",
    flexDirection: "column",
    width: 300,
    margin: theme.spacing(2),
    background: "none",
    boxShadow: "none"
  },
  media: {
    height: 300,
    objectFit: "scale-down"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    minHeight: 150,
    padding: 10
  }
}));

const useMobileStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    backgroundColor: theme.palette.secondary.light,
    fontSize: 18
  },
  title: {
    alignSelf: "flex-start",
    padding: theme.spacing(2, 0, 0, 5),
    fontWeight: "bold",
    fontSize: "1.22em"
  },
  subtitle: {
    padding: theme.spacing(1),
    fontSize: "1em",
    textTransform: "uppercase",
    color: theme.palette.primary.main
  },
  text: {
    padding: theme.spacing(1),
    fontSize: "1em"
  },
  card: {
    display: "flex",
    flexDirection: "column",
    width: 300,
    margin: theme.spacing(2, 2, 0, 2),
    background: "none",
    boxShadow: "none"
  },
  media: {
    height: 300,
    objectFit: "scale-down"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    minHeight: 150,
    padding: 10
  }
}));

const howItWorksSteps = [
  {
    title: "Step 1",
    image: "/static/howitworks1.svg",
    description: "First, you fill out an approximately 2-minute long questionnaire to let us know about your vacation preferences, including dining, activities, transportation, and more."
  },
  {
    title: "Step 2",
    image: "/static/howitworks2.svg",
    description: "Then, our advanced data science model pulls data from thousands of outside sources (Yelp, Trip Advisor, Google Reviews) to aggregate the consistently top-rated experiences within your travel destination."
  },
  {
    title: "Step 3",
    image: "/static/howitworks3.svg",
    description: "Finally, we match your preferences to the top-rated experiences within your destination and build an optimized itinerary for your vacation. We show you a preview of that itinerary, and if you think that it's worth it, you can prurchase it for just $10."
  }
];

const StyledMobileStepper = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
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

function HowItWorksComponent(props) {
  const { step, index, classes } = props;
  return (
    <Card key={index} className={classes.card}>
      <CardMedia
        className={classes.media}
        image={step.image}
        title={step.title}
        component="img"
      />
      <CardContent className={classes.content}>
        <Typography className={classes.subtitle}>{step.title}</Typography>
        <Typography
          className={classes.text}
          variant="body2"
          color="textSecondary"
          component="p"
        >{step.description}</Typography>
      </CardContent>
    </Card>
  );
};

function HowItWorks(props) {
  const { isMobile } = props;
  const classes = isMobile ? useMobileStyles() : useStyles();

  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = howItWorksSteps.length;

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    isMobile ? (
      <Box className={classes.root}>
        <Typography className={classes.title}>How it works</Typography>
        <SwipableViews index={activeStep} onChangeIndex={handleStepChange}>
          {howItWorksSteps.map((step, index) => (
            <HowItWorksComponent
              key={index}
              step={step}
              index={index}
              classes={classes}
            />
          ))}
        </SwipableViews>
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
            <Typography className={classes.title}>How it works</Typography>
            <Grid className={classes.grid}>
              {howItWorksSteps.map((step, index) => (
                <HowItWorksComponent
                  key={index}
                  step={step}
                  index={index}
                  classes={classes}
                />
              ))}
            </Grid>
          </Grid>
        </Box >
      )
  );
}

export default HowItWorks;
