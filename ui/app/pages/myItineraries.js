import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { makeStyles } from "@material-ui/styles";
import { Container, Typography, Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Meta from "../components/Head";
import { itineraryReducer } from "../redux/reducers";
import LogoNavigationBar from "../components/LogoNavigationBar";
import SavedForYou from "../components/Itinerary/SavedForYou";
import SavedItinerariesDetails from "../components/Itinerary/SavedItinerariesDetails";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "180px",
    marginBottom: "70px",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "80px",
    },
    display: "flex",
    flexWrap: "wrap",
  },
  pageHeading: {
    fontSize: "44px",
    fontWeight: "600",
    color: theme.typography.color,
    [theme.breakpoints.down("xs")]: {
      fontSize: "26px",
    },
  },
  savedForYou: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: "30%",
      flexBasis: "30%",
    },
  },
  pageBody: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  savedItinerariesDetails: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: "70%",
      flexBasis: "70%",
    },
  },
}));
const MyItineraries = () => {
  const store = createStore(itineraryReducer);
  const classes = useStyles();

  return (
    <Provider store={store}>
      <Meta />
      <LogoNavigationBar />
      <Container className={classes.root}>
        <Box>
          <Typography className={classes.pageHeading}>
            My Itineraries
          </Typography>
        </Box>
        <Grid container className={classes.pageBody}>
          <Grid sm={3} className={classes.savedForYou}>
            <SavedForYou />
          </Grid>
          <Grid sm={9} className={classes.savedItinerariesDetails}>
            <SavedItinerariesDetails />
            <SavedItinerariesDetails />
          </Grid>
        </Grid>
      </Container>
    </Provider>
  );
};

export default MyItineraries;
