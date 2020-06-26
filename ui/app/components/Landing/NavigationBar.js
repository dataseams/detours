import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Paper, AppBar, Toolbar, Box, IconButton, Menu, MenuItem, Button, duration, Divider } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import NavigationBarButton from "./NavigationBarButton";
import GetStartedButton from "./GetStartedButton";
import LogoButton from "../LogoButton";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
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
    backgroundColor: "white"
  }
})(AppBar);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  box: {
    flexGrow: 1,
    xs: 4
  },
  appBar: {
    color: "white",
    backgroundColor: "white"
  },
  toolBar: {
    justifyContent: "flex-end",
    flexDirection: "row"
  }
}));

const useMobileStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  box: {
    flexGrow: 1,
    xs: 4
  },
  appBar: {
    color: "white",
    backgroundColor: "white"
  },
  toolBar: {
    justifyContent: "flex-end",
    flexDirection: "row"
  }
}));

function NavigationBar(props) {
  const { isMobile } = props;
  const classes = isMobile ? useMobileStyles() : useStyles();
  const [anchorEl, setAnchorEl] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <StyledAppBar>
          <Toolbar>
            <Box className={classes.box}>
              <LogoButton name="DETOURS" />
            </Box>
            {/* <NavigationBarButton name="How it works" />
            <NavigationBarButton name="Pricing" />
            <NavigationBarButton name="About us" /> */}
            {/* <GetStartedButton /> */}
            <IconButton aria-label="menu" onClick={handleClick}>
              <MenuIcon />
            </IconButton>
            <Menu
              id="main-menu"
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>How it works</MenuItem>
              <Divider style={{ backgroundColor: "blue", width: "80%" }} />
              <MenuItem onClick={handleClose}>Pricing</MenuItem>
              <Divider style={{ backgroundColor: "blue", width: "80%" }} />
              <MenuItem onClick={handleClose}>About us</MenuItem>
              <MenuItem><GetStartedButton /></MenuItem>
              <MenuItem><Button>Log in</Button></MenuItem>
            </Menu>
          </Toolbar>
        </StyledAppBar>
      </ElevationScroll>
    </React.Fragment>
  );
}

export default NavigationBar;
