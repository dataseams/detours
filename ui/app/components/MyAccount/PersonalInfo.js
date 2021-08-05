import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import GenderDialog from "./GenderDialog";
import AgeDialog from "./AgeDialog";

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
  button: {
    color: theme.palette.primary.light,
  },
}));

const PersonalInfo = () => {
  const classes = useStyles();
  const [openGenderDialog, setOpenGenderDialog] = React.useState(false);
  const [openAgeDialog, setOpenAgeDialog] = React.useState(false);
  const handleGenderDialog = () => {
    setOpenGenderDialog(!openGenderDialog);
  };
  const handleAgeDialog = () => {
    setOpenAgeDialog(!openAgeDialog);
  };

  return (
    <>
      <Box className={classes.listBorders}>
        <Typography className={classes.heading}>Personal Info</Typography>
        <List>
          <ListItem className={classes.listItem}>
            <Box display="flex" flex="1">
              <ListItemText
                className={classes.listItemText}
                primary="Email Address"
                secondary="sam@dataseams.com"
              />
              <Box>
                <Button disabled className={classes.button}>
                  Edit
                </Button>
              </Box>{" "}
            </Box>
          </ListItem>
          <Divider />
          <ListItem className={classes.listItem}>
            <Box display="flex" flex="1">
              <ListItemText
                className={classes.listItemText}
                primary="Gender"
                secondary="Male"
              />
              <Box>
                <Button className={classes.button} onClick={handleGenderDialog}>
                  Edit
                </Button>
              </Box>
            </Box>
          </ListItem>
          <Divider />
          <ListItem className={classes.listItem}>
            <Box display="flex" flex="1">
              <ListItemText
                className={classes.listItemText}
                primary="Age"
                secondary="24"
              />
              <Box>
                <Button className={classes.button} onClick={handleAgeDialog}>
                  Edit
                </Button>
              </Box>{" "}
            </Box>
          </ListItem>
        </List>
      </Box>
      <GenderDialog open={openGenderDialog} handleDialog={handleGenderDialog} />
      <AgeDialog open={openAgeDialog} handleDialog={handleAgeDialog} />
    </>
  );
};

export default PersonalInfo;
