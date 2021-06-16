import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  listBorders: {
    borderRadius: "15px",
    marginTop: "20px",
    marginLeft: "25px",
    marginRight: "0px",
    border: `1px solid ${theme.palette.borderColor}`,
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0",
      width: "auto",
    },
    padding: "30px",
  },
  heading: {
    fontSize: "26px",
    fontWeight: "600",
    color: theme.typography.color,
    marginBottom: "25px",
  },
  listItem: {
    paddingLeft: "0px",
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
  date: {
    fontWeight: "600",
    color: theme.typography.color,
  },
  button: {
    "& .MuiButton-label": {
      color: theme.palette.primary.light,
      textTransform: "none",
    },
    alignItems: "flex-start",
  },
}));

const SurveyAnswer = () => {
  const classes = useStyles();

  return (
    <Box className={classes.listBorders}>
      <Typography className={classes.heading}>Survey Answers</Typography>
      <Typography>
        The last time you answered our survey was{" "}
        <span className={classes.date}>December 23, 2020</span>. You can modify
        individual answers below or you can choose to{" "}
        <Link underline="always">retake the survey.</Link>
      </Typography>
      <List component="ol">
        <ListItem className={classes.listItem}>
          <Box display="flex" flex="1" a>
            <ListItemText
              className={classes.listItemText}
              primary="1. What is your age and gender?"
              secondary="Age: 37, Gender: Female"
            />
            <Box>
              <Button className={classes.button}>Edit</Button>
            </Box>{" "}
          </Box>
        </ListItem>
        <Divider />
        <ListItem className={classes.listItem}>
          <Box display="flex" flex="1" a>
            <ListItemText
              className={classes.listItemText}
              primary="2. What do you like to do when you travel?"
              secondary="Food & beverages, Museums, Outdoors, Nightlife"
            />
            <Box>
              <Button className={classes.button}>Edit</Button>
            </Box>
          </Box>
        </ListItem>
        <Divider />
        <ListItem className={classes.listItem}>
          <Box display="flex" flex="1" a>
            <ListItemText
              className={classes.listItemText}
              primary="3. Which museums do you enjoy the most?"
              secondary="Science, Art"
            />
            <Box>
              <Button className={classes.button}>Edit</Button>
            </Box>{" "}
          </Box>
        </ListItem>
      </List>
    </Box>
  );
};

export default SurveyAnswer;
