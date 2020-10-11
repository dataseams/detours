import React from "react";
import { Button } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const NavigationButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 18,
    lineHeight: 1,
    borderRadius: 0,
    "&:hover": {
      borderBottom: "2px solid #7983c9"
    }
  }
})(Button);

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
    backgroundColor: "white"
  }
}));

function NavigationBarButton(props) {
  const classes = useStyles();

  return (
    <div>
      <NavigationButton className={classes.margin}>
        {props.name}
      </NavigationButton>
    </div>
  );
}
export default NavigationBarButton;
