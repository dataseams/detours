import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

import NavigationBarButton from "./NavigationBarButton";
import GetStartedButton from "./GetStartedButton";
import LogoButton from "../LogoButton";
import Auth from "../autht";

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

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 14, 0, 13),
  },
}));

const useMobileToolbarStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 2, 0, 2),
  },
}));

const useLogoStyles = makeStyles((theme) => ({
  box: {
    flexGrow: 1,
  },
}));

const useDrawerStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
  },
}));

const useListStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

const useDividerStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const useTextStyles = makeStyles((theme) => ({
  root: {
    fontSize: theme.typography.fontSize,
    padding: theme.spacing(1, 0),
    color: theme.typography.color,
  },
  primary: {
    fontSize: "1.167em",
    fontWeight: 500,
  },
}));

function MobileToolbar(props) {
  const { isMobile } = props;
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const logoClasses = useLogoStyles();
  const drawerClasses = useDrawerStyles();
  const listClasses = useListStyles();
  const dividerClasses = useDividerStyles();
  const textclasses = useTextStyles();
  const toolbarClasses = useMobileToolbarStyles();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "tab" || event.key === "shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      padding={2}
      marginTop={3}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List classes={listClasses}>
        <ListItem button alignItems="center">
          <ListItemText />
          <ListItemText classes={textclasses} primary={"How It Works"} />
        </ListItem>
        <Divider variant="middle" classes={dividerClasses} />
        <ListItem button alignItems="center">
          <ListItemText />
          <ListItemText classes={textclasses} primary={"Pricing"} />
        </ListItem>
        <Divider variant="middle" classes={dividerClasses} />
        <ListItem button alignItems="center">
          <ListItemText />
          <ListItemText classes={textclasses} primary={"About Us"} />
        </ListItem>
        <ListItem />
        <ListItem />
        <ListItem>
          <GetStartedButton isMobile={isMobile} />
        </ListItem>
        <ListItem>
          <Auth />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Toolbar classes={toolbarClasses}>
      <Box className={logoClasses.box}>
        <LogoButton name="DETOURS" />
      </Box>
      <IconButton aria-label="menu" onClick={toggleDrawer("right", true)}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        classes={drawerClasses}
      >
        {list("right")}
      </Drawer>
    </Toolbar>
  );
}

function NavigationBar(props) {
  const { isMobile } = props;
  const logoClasses = useLogoStyles();
  const toolbarClasses = useToolbarStyles();

  return (
    <ElevationScroll {...props}>
      <StyledAppBar>
        {isMobile ? (
          <MobileToolbar isMobile={isMobile} />
        ) : (
          <Toolbar classes={toolbarClasses}>
            <Box className={logoClasses.box}>
              <LogoButton name="DETOURS" />
            </Box>
            <NavigationBarButton name="How it works" />
            <NavigationBarButton name="Pricing" />
            <NavigationBarButton name="About us" />
            <GetStartedButton />
          </Toolbar>
        )}
      </StyledAppBar>
    </ElevationScroll>
  );
}

export default NavigationBar;
