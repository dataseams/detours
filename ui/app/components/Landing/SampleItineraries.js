import {
  Box,
  Grid,
  Card,
  Typography,
  CardMedia,
  CardActionArea,
  CardContent,
  MobileStepper
} from "@material-ui/core";
import { makeStyles, useTheme, withStyles } from "@material-ui/styles";
import SwipeableViews from "react-swipeable-views";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "left",
    fontSize: theme.typography.fontSize,
    backgroundColor: theme.palette.primary.main,
    color: theme.typography.color,
    padding: theme.spacing(5, 16)
  },
  h2: {
    color: "white",
    paddingBottom: theme.spacing(2),
    ...theme.h2.desktop
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-between",
    flexWrap: "wrap",
    margin: theme.spacing(0, -2)
  },
  card: {
    width: 200,
    margin: theme.spacing(2, 2)
  },
  media: {
    height: 140
  },
  content: {
    height: 50,
    padding: 10
  },
  body: {
    paddingLeft: theme.spacing(1),
    ...theme.body
  }
}));

const useMobileStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    flexGrow: 1,
    fontSize: theme.typography.fontSize,
    color: theme.typography.color
  },
  h2: {
    color: "white",
    paddingTop: theme.spacing(4),
    paddingLeft: "20%",
    ...theme.h2.mobile
  },
  cardContainer: {
    width: "100%",
    paddingLeft: "20%",
    padding: theme.spacing(3, 0, 3, 0)
  },
  card: {
    width: "75%"
  },
  media: {
    height: 140
  },
  content: {
    height: 50,
    padding: 10
  },
  body: {
    paddingLeft: theme.spacing(1),
    ...theme.body
  },
  stepper: {
    paddingBottom: theme.spacing(4)
  }
}));

const StyledMobileStepper = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.typography.color
  },
  dot: {
    backgroundColor: "white",
    width: "17px",
    height: "17px",
    margin: "5px"
  },
  dotActive: {
    backgroundColor: theme.palette.secondary.dark
  }
}))(MobileStepper);

const itineraries = [
  { title: "Paris, France", image: "static/paris.png" },
  { title: "New York, NY", image: "static/nyc.png" },
  { title: "San Francisco, CA", image: "static/goldengate.png" },
  { title: "Barcelona, Spain", image: "static/barcelona.png" },
];

const Itineraries = props => {
  const { isMobile } = props;
  const classes = isMobile ? useMobileStyles() : useStyles();

  return (
    itineraries.map((step, index) => (
      <Card key={index} className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={step.image}
            title={step.title}
          />
          <CardContent className={classes.content}>
            <Typography className={classes.body}>{step.title}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    ))
  )
};

function SampleItineraries(props) {
  const { isMobile } = props;
  const classes = isMobile ? useMobileStyles() : useStyles();

  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = itineraries.length;

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    (isMobile) ? (
      <Box className={classes.root}>
        <Typography className={classes.h2}>
          See sample itineraries to:
        </Typography>
        <SwipeableViews index={activeStep} onChangeIndex={handleStepChange}>
          {itineraries.map((itinerary, index) => (
            <Box key={index} className={classes.cardContainer}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={itinerary.image}
                    title={itinerary.title}
                  />
                  <CardContent className={classes.content}>
                    <Typography className={classes.body}>
                      {itinerary.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
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
          className={classes.stepper}
        />
      </Box>
    ) : (
        <Box className={classes.root} >
          <Typography className={classes.h2}>
            See sample itineraries to:
            </Typography>
          <Grid className={classes.grid}>
            <Itineraries isMobile={isMobile} />
          </Grid>
        </Box>
      )
  )
}

export default SampleItineraries;
