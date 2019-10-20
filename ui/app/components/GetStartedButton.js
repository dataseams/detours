import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const StyledButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    lineHeight: 1,
    backgroundColor: "#5865bc",
    color: "white",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#7983c9",
      color: "white",
      boxShadow: "5px 40px -10px rgba(0, 0, 0, 0.57)",
      WebkitBoxShadow: "0px 5px 40px -10px rgba(0, 0, 0, 0.57)",
      MozBoxShadow: "0px 5px 40px -10px rgba(0, 0, 0, 0.57)",
    },
    transitionDuration: "0.4",
    WebkitTransitionDuration: "0.4",
    height: "2.5em",
    width: "8em",
  }
})(Button);

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

function GetStartedButton() {
  const classes = useStyles();

  return (
    <div>
      <StyledButton size="large" className={classes.margin}>Get Started</StyledButton>
    </div>
  );
}
export default GetStartedButton;
