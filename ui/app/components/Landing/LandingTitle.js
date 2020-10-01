import { Box, Grid, Typography } from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";

import GetStartedButton from "./GetStartedButton";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexGrow: 1,
    padding: theme.spacing(20, 0, 7, 0),
    color: theme.typography.color
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  h1: {
    textAlign: "center",
    maxWidth: "750px",
    ...theme.h1.desktop
  },
  subtitle: {
    fontSize: 20,
    padding: theme.spacing(3, 0),
    textAlign: "center",
    lineHeight: "1.7em"
  }
}));

const useMobileStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexGrow: 1,
    padding: theme.spacing(12, 3, 6, 3),
    color: theme.typography.color
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  h1: {
    fontWeight: "bold",
    textAlign: "center",
    maxWidth: "750px",
    ...theme.h1.mobile
  },
  subtitle: {
    fontSize: theme.typography.fontSize,
    textAlign: "center",
    padding: theme.spacing(4, 0),
    lineHeight: "1.7em"
  }
}));

function LandingTitle(props) {
  const { isMobile } = props;
  const classes = isMobile ? useMobileStyles() : useStyles();

  return (
    <Box className={classes.root}>
      <Grid className={classes.grid}>
        <Typography variant="h2" className={classes.h1}>
          Your dream vacation, for pocket change.
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
