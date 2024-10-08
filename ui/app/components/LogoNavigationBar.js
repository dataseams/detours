import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Box } from "@material-ui/core";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

import LogoButton from "./LogoButton";
import Auth from "./auth";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const StyledAppBar = withStyles({
  root: {
    backgroundColor: "white",
  },
})(AppBar);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  box: {
    flexGrow: 1,
    xs: 4,
  },
  appBar: {
    color: "white",
    backgroundColor: "white",
  },
  toolBar: {
    justifyContent: "flex-end",
    flexDirection: "row",
  },
}));

function LogoNavigationBar(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <StyledAppBar>
          <Toolbar>
            <Box className={classes.box}>
              <LogoButton name="DETOURS" />
            </Box>
            <Auth />
          </Toolbar>
        </StyledAppBar>
      </ElevationScroll>
    </React.Fragment>
  );
}

export default LogoNavigationBar;
