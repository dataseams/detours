import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  nextButton: {
    margin: theme.spacing(1),
    minWidth: "20%",
    backgroundColor: "#5865bc",
    color: "white",
    "&:hover": {
      backgroundColor: "#5865bc",
      opacity: 0.7,
    },
  },

  hiddenButton: {
    margin: theme.spacing(1),
    minWidth: "20%",
    backgroundColor: "#5865bc",
    color: "white",
    "&:hover": {
      backgroundColor: "#5865bc",
      opacity: 0.7,
    },
    display: "none",
  },

  backButton: {
    margin: theme.spacing(1),
    minWidth: "20%",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "white",
      opacity: 0.7,
    },
  },

  purchaseButton: {
    margin: theme.spacing(1),
    width: "120px",
    height: "45px",
    backgroundColor: "#5865bc",
    color: "white",
    "&:hover": {
      backgroundColor: "#5865bc",
      opacity: 0.7,
    },
    textTransform: "none",
    fontSize: "16px",
    margin: "1em",
  },
}));

function Back(props) {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      className={classes.backButton}
      onClick={props.toggle}
      disabled={props.active}
    >
      Back
    </Button>
  );
}

function Next(props) {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      className={props.hidden ? classes.hiddenButton : classes.nextButton}
      onClick={props.toggle}
      disabled={props.disable}
    >
      Next
    </Button>
  );
}

function Submit(props) {
  const classes = useStyles();
  const { type, handleSubmit, disable } = props;
  return (
    <Button
      variant="contained"
      onClick={handleSubmit}
      className={props.hidden ? classes.nextButton : classes.hiddenButton}
      type={type}
      disabled={disable}
    >
      Submit
    </Button>
  );
}

function Purchase(props) {
  const classes = useStyles();
  const { className, ...otherProps } = props;

  return (
    <Button
      variant="contained"
      className={classes.purchaseButton}
      {...otherProps}
    >
      {props.children}
    </Button>
  );
}

export { Back, Next, Submit, Purchase };
