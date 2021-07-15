import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
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
  button: {
    textTransform: "capitalize",
    padding: "10px 30px",
    fontWeight: "400",
  },
}));

const IsThisGoodbye = ({ handleListItemClick }) => {
  const classes = useStyles();

  return (
    <Box>
      <Typography className={classes.heading}>Is this goodbye?</Typography>
      <List>
        <ListItem className={classes.listItem}>
          <Box display="flex" flex="1">
            <ListItemText
              className={classes.listItemText}
              primary="Now just a minute."
              secondary="Are you sure you want to delete your account? You'll lose everything. All of your saved itineraries and survey answers. If you're sure, you can start the process here."
            />
          </Box>
        </ListItem>
      </List>
      <Box width={[1, 1, 0.4, 0.3]}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          fullWidth
          onClick={(event) => handleListItemClick(event, 1)}
        >
          Delete my account
        </Button>
      </Box>
    </Box>
  );
};

export default IsThisGoodbye;
