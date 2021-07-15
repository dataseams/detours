import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  listBorders: {
    marginTop: "20px",
    border: `1px solid ${theme.palette.borderColor}`,
    borderRadius: "15px",
    [theme.breakpoints.down("xs")]: {
      width: "auto",
    },
  },
  icon: {
    color: theme.palette.iconColor,
  },
  listItemsText: {
    "& .MuiListItemText-primary": {
      fontWeight: 500,
      color: theme.typography.color,
    },
  },
}));

const General = ({ selectedIndex, handleListItemClick }) => {
  const classes = useStyles();

  return (
    <Box className={classes.listBorders}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem>
          <ListItemText className={classes.listItemsText} primary="GENERAL" />
        </ListItem>
        <Divider />
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <AccountCircleIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText
            className={classes.listItemsText}
            primary="Personal Info"
          />
        </ListItem>
        <Divider />
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <NotificationsIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText
            className={classes.listItemsText}
            primary="Notifications"
          />
        </ListItem>
        <Divider />
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <NotInterestedIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText
            className={classes.listItemsText}
            primary="Delete Account"
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default General;
