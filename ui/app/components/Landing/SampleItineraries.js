import {
  Box,
  Grid,
  Card,
  Typography,
  CardMedia,
  CardActionArea,
  CardContent,
  MobileStepper,
  Button
} from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { makeStyles, useTheme } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "center",
    backgroundColor: "#5865bc"
  },
  title: {
    color: "white",
    alignSelf: "flex-start",
    paddingLeft: theme.spacing(2)
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
    justifyContent: "center",
  },
  card: {
    width: 200,
    margin: theme.spacing(2)
  },
  media: {
    height: 140
  },
  content: {
    height: 40,
    padding: 10
  },
  text: {
    fontSize: "1.1em"
  }
}));

const useMobileStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    flexGrow: 1
  },
  card: {
    width: "60%",
    margin: theme.spacing(2)
  },
  media: {
    height: 140
  },
  content: {
    height: 40,
    padding: 10
  },
  text: {
    fontSize: "1.1em"
  }
}));

const itineraries = [
  { title: "Paris, France", image: "static/paris.png" },
  { title: "New York, NY", image: "static/nyc.png" },
  { title: "San Francisco, CA", image: "static/goldengate.png" },
  { title: "Barcelona, Spain", image: "static/barcelona.png" },
]

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
            <Typography className={classes.text}>{step.title}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    ))
  )
}

function SampleItineraries(props) {
  const { isMobile } = props;
  const classes = isMobile ? useMobileStyles() : useStyles();

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = itineraries.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    (isMobile) ? (
      <div className={classes.root}>
        <Box display="flex" alignItems="center">
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={itineraries[activeStep].image}
                title={itineraries[activeStep].title}
              />
              <CardContent className={classes.content}>
                <Typography className={classes.text}>
                  {itineraries[activeStep].title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="text"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
              Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
          }
        />
      </div>
    ) : (
        <Box className={classes.root} >
          <Grid className={classes.mainGrid}>
            <Typography className={classes.title}>
              See sample itineraries to:
          </Typography>
            <Grid className={classes.grid}>
              <Itineraries isMobile={isMobile} />
            </Grid>
          </Grid>
        </Box>
      )
  )
}

export default SampleItineraries;
