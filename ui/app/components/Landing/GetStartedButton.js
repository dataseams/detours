import React from "react";
import { Button, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: "none",
    textTransform: "none",
    boxShadow: "3px 30px -10px rgba(0, 0, 0, 0.57)",
    ...theme.body,
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#7983c9",
      color: "white",
      boxShadow: "5px 40px -10px rgba(0, 0, 0, 0.57)",
      WebkitBoxShadow: "0px 5px 40px -10px rgba(0, 0, 0, 0.57)",
      MozBoxShadow: "0px 5px 40px -10px rgba(0, 0, 0, 0.57)",
      textDecoration: "none"
    },
    transitionDuration: "0.4",
    WebkitTransitionDuration: "0.4",
    height: "3em",
    width: "9em",
    margin: theme.spacing(1)
  }
}));

const useMobileStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    textTransform: "none",
    ...theme.body,
    backgroundColor: theme.palette.primary.main,
    color: "white",
    height: "3em",
    borderRadius: "2px"
  }
}));

function GetStartedButton(props) {
  const { isMobile } = props;
  const classes = isMobile ? useMobileStyles() : useStyles();

  return (
    <Button
      variant="contained"
      component={Link}
      href="/questionnaire"
      className={classes.root}
      fullWidth={true}
    >
      Get started
    </Button>
  );
}
export default GetStartedButton;
