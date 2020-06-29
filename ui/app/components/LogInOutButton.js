import React from "react";
import { Button, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    textTransform: "none",
    fontSize: 16,
    borderColor: theme.palette.primary.main,
    height: "3.5em",
    borderRadius: "2px"
  }
}));

function LogInOutButton(props) {
  const { text, onClick } = props;
  const classes = useStyles();

  return (
    <Button
      variant="outlined"
      className={classes.root}
      fullWidth={true}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
export default LogInOutButton;
