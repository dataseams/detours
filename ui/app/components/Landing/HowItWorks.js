import {
  Box,
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
    flexFlow: "column",
    justifyContent: "left",
    fontSize: theme.body.fontSize,
    backgroundColor: theme.palette.secondary.light,
    color: theme.typography.color,
    padding: theme.spacing(5, 15)
  },
  h2: {
    ...theme.h2.desktop
  },
  h3: {
    padding: theme.spacing(1, 0),
    ...theme.h3
  },
  body: {
    ...theme.body
  },
  stepsContainer: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: theme.spacing(0, -1)
  },
  card: {
    display: "flex",
    flexDirection: "column",
    width: 300,
    background: "none",
    boxShadow: "none",
    margin: theme.spacing(0, 1)
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
    justifyContent: "left",
    backgroundColor: theme.palette.secondary.light,
    color: theme.typography.color,
    padding: theme.mainContainer.mobile.padding
  },
  h2: {
    ...theme.h2.mobile
  },
  h3: {
    ...theme.h3
  },
  body: {
    ...theme.body
  },
  content: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2, 0, 0, 0)
  },
  card: {
    display: "flex",
    flexDirection: "column",
    background: "none",
    boxShadow: "none"
  },
  media: {
    objectFit: "scale-down",
    height: "250px"
  }
}));

const howItWorksSteps = [
  {
    title: "Step 1",
    image: "/static/howitworks1.svg",
    description: "First, you fill out an approximately 2-minute long survey to let us know about your vacation preferences, including dining, activities, and more."
  },
  {
    title: "Step 2",
    image: "/static/howitworks2.svg",
    description: "Then, our advanced AI model pulls data from thousands of outside sources to aggregate the consistently top-rated experiences within your travel destination."
  },
  {
    title: "Step 3",
    image: "/static/howitworks3.svg",
    description: "Finally, we select results matching your preferences to build you an optimized itinerary. We show you a preview of it, and if you like it, you can subscribe for just $3."
  }
];

const StyledMobileStepper = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.light
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
        <Typography className={classes.h3}>{step.title}</Typography>
        <Typography
          className={classes.body}
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
        <Typography className={classes.h2}>How it works</Typography>
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
      </Box>
    ) : (
        <Box className={classes.root}>
          <Typography className={classes.h2}>How it works</Typography>
          <Box className={classes.stepsContainer}>
            {howItWorksSteps.map((step, index) => (
              <HowItWorksComponent
                key={index}
                step={step}
                index={index}
                classes={classes}
              />
            ))}
          </Box>
        </Box >
      )
  );
}

export default HowItWorks;
