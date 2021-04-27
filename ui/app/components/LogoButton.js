import React from "react";
import { Button, Link } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const StyledButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    lineHeight: 1,
    borderRadius: 0,
    textDecoration: "none",
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    backgroundColor: "white",
  },
}));

function LogoButton(props) {
  const classes = useStyles();

  return (
    <div>
      <StyledButton
        className={classes.margin}
        component={Link}
        href="/"
        style={{ textDecoration: "none" }}
      >
        {props.name}
      </StyledButton>
    </div>
  );
}
export default LogoButton;
