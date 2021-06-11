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
  savedForYou: {
    [theme.breakpoints.down("xs")]: {
      width: "335px",
    },
  },
  pageHeading: {
    fontSize: "44px",
    fontWeight: "600",
    color: theme.typography.color,
    [theme.breakpoints.down("xs")]: {
      fontSize: "26px",
    },
  },
  listBorders: {
    border: `1px solid ${theme.palette.borderColor}`,
    borderRadius: "15px",
  },
  icon: {
    color: theme.palette.iconColor,
  },
  listItems: {
    "& .MuiListItemText-primary": {
      fontWeight: 500,
      color: theme.typography.color,
    },
  },
}));
const SavedForYou = () => {
  const classes = useStyles();

  return (
    <Box className={classes.savedForYou}>
      <Typography className={classes.pageHeading}>My Itineraries</Typography>
      <Box className={classes.listBorders} mt={[2, 0, 0, 0]}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem>
            <ListItemText
              className={classes.listItems}
              primary="SAVED FOR YOU"
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <BookmarksIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText className={classes.listItems} primary="Itineraries" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <DescriptionIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText
              className={classes.listItems}
              primary="Survey Answers"
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default SavedForYou;
