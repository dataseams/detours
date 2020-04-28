import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Box, IconButton } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import LogoButton from "./LogoButton";
import Auth from "../pages/auth";

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
    backgroundColor: "red"
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

function LogoNavigationBar(props) {
  const classes = useStyles();
  const menuId = 'primary-search-account-menu';
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
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
            <Auth />
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </StyledAppBar>
      </ElevationScroll>
    </React.Fragment>
  );
}

export default LogoNavigationBar;
