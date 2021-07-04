import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { makeStyles } from "@material-ui/styles";
import { Container, Typography, Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Meta from "../components/Head";
import { itineraryReducer } from "../redux/reducers";
import LogoNavigationBar from "../components/LogoNavigationBar";
import General from "../components/MyAccount/General";
import PersonalInfo from "../components/MyAccount/PersonalInfo";

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
  general: {
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
  personalInfo: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: "70%",
      flexBasis: "70%",
    },
  },
}));

const MyAccount = () => {
  const store = createStore(itineraryReducer);
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <Provider store={store}>
      <Meta />
      <LogoNavigationBar />
      <Container className={classes.root}>
        <Box>
          <Typography className={classes.pageHeading}>Settings</Typography>
        </Box>
        <Grid container className={classes.pageBody}>
          <Grid item sm={3} className={classes.general}>
            <General selectedIndex={selectedIndex} />
          </Grid>
          <Grid item sm={9} className={classes.personalInfo}>
            <PersonalInfo />
          </Grid>
        </Grid>
      </Container>
    </Provider>
  );
};

export default MyAccount;
