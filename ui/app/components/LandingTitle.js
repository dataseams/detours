import { Box, Grid, Typography } from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";

import GetStartedButton from "./GetStartedButton";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(20, 0, 10, 0),
    maxWidth: "85%"
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    fontWeight: "bold",
    textAlign: "center"
  },
  subtitle: {
    fontSize: 20,
    padding: theme.spacing(3, 0),
    textAlign: "center"
  }
}));

function LandingTitle() {
  const classes = useStyles();

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
        <GetStartedButton />
      </Grid>
    </Box>
  );
}

export default LandingTitle;
