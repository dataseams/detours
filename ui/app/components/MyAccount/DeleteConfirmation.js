import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: "26px",
    fontWeight: "600",
    color: theme.typography.color,
    marginBottom: "25px",
  },
  listItem: {
    padding: "0px",
  },
  listItemText: {
    "& .MuiListItemText-primary": {
      fontWeight: "600",
      color: theme.typography.color,
    },
    "& .MuiListItemText-secondary": {
      margin: "5px 0px",
      color: theme.typography.color,
    },
  },
}));

const DeleteConfirmation = () => {
  const classes = useStyles();

  return (
    <Box>
      <Typography className={classes.heading}>
        Your account has been deleted.
      </Typography>
      <List>
        <ListItem className={classes.listItem}>
          <Box display="flex" flex="1">
            <ListItemText
              className={classes.listItemText}
              primary="Feel free to come back anytime!"
              secondary="Your personal data and itineraries have been deleted, but you're welcome to come back anytime in the future!"
            />
          </Box>
        </ListItem>
      </List>
    </Box>
  );
};

export default DeleteConfirmation;
