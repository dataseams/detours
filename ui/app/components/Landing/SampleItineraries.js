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
import ReactSwipe from "react-swipe";

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
  },
  mobilRoot: {
    maxWidth: 400,
    flexGrow: 1
  }
}));

function SampleItineraries(props) {
  const { isMobile } = props;
  const classes = useStyles();

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = 4;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  let reactSwipeEl;

  return (
    (isMobile) ? (
      <div>
        <ReactSwipe
          className="carousel"
          swipeOptions={{ continous: false }}
          ref={el => (reactSwipeEl = el)}
        >
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/static/paris.png"
                title="Paris, France"
              />
              <CardContent className={classes.content}>
                <Typography className={classes.text}>Paris, France</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/static/nyc.png"
                title="New York, NY"
              />
              <CardContent className={classes.content}>
                <Typography className={classes.text}>New York, NY</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/static/goldengate.png"
                title="San Francisco, CA"
              />
              <CardContent className={classes.content}>
                <Typography className={classes.text}>
                  San Francisco, CA
                    </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/static/barcelona.png"
                title="Barcelona, Spain"
              />
              <CardContent className={classes.content}>
                <Typography className={classes.text}>
                  Barcelona, Spain
                    </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </ReactSwipe>
        <MobileStepper
          variant="dots"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileRoot}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps}>
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
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="/static/paris.png"
                    title="Paris, France"
                  />
                  <CardContent className={classes.content}>
                    <Typography className={classes.text}>Paris, France</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="/static/nyc.png"
                    title="New York, NY"
                  />
                  <CardContent className={classes.content}>
                    <Typography className={classes.text}>New York, NY</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="/static/goldengate.png"
                    title="San Francisco, CA"
                  />
                  <CardContent className={classes.content}>
                    <Typography className={classes.text}>
                      San Francisco, CA
                  </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="/static/barcelona.png"
                    title="Barcelona, Spain"
                  />
                  <CardContent className={classes.content}>
                    <Typography className={classes.text}>
                      Barcelona, Spain
                  </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )
  )
}

export default SampleItineraries;
