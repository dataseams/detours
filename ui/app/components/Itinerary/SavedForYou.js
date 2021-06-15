import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import DescriptionIcon from "@material-ui/icons/Description";
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

const SavedForYou = ({ selectedIndex, handleListItemClick }) => {
  const classes = useStyles();

  return (
    <Box className={classes.listBorders} mt={[2, 0, 0, 0]}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem>
          <ListItemText
            className={classes.listItemsText}
            primary="SAVED FOR YOU"
          />
        </ListItem>
        <Divider />
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <BookmarksIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText
            className={classes.listItemsText}
            primary="Itineraries"
          />
        </ListItem>
        <Divider />
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <DescriptionIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText
            className={classes.listItemsText}
            primary="Survey Answers"
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default SavedForYou;
