import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    textTransform: "none",
    borderColor: theme.palette.primary.main,
    borderWidth: "2px",
    color: theme.palette.primary.main,
    height: "3.3em",
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
