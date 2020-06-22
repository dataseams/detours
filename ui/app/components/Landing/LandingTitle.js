import { Box, Grid, Typography } from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";

import GetStartedButton from "./GetStartedButton";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexGrow: 1,
    padding: theme.spacing(20, 0, 10, 0),
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    maxWidth: "750px"
  },
  subtitle: {
    fontSize: 20,
    padding: theme.spacing(3, 0),
    textAlign: "center"
  }
}));

const useMobileStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexGrow: 1,
    padding: theme.spacing(10, 0, 5, 0),
    fontSize: 18
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3)
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    maxWidth: "750px",
    fontSize: "1.44em"
  },
  subtitle: {
    fontSize: 18,
    padding: theme.spacing(4, 0, 4, 0),
    textAlign: "center"
  }
}));

function LandingTitle(props) {
  const { isMobile } = props;
  const classes = isMobile ? useMobileStyles() : useStyles();

  return (
    <Box className={classes.root}>
      <Grid className={classes.grid}>
        <Typography variant="h2" className={classes.title}>
          Plan your dream vacation, tailored just for you.
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Fill out a short questionnaire and get a personalized itinerary.
          <br />
          No credit card or commitment required.
        </Typography>
        <GetStartedButton isMobile={isMobile} />
      </Grid>
    </Box>
  );
}

export default LandingTitle;
