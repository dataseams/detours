import React from "react";
import { makeStyles } from "@material-ui/styles";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Box, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import GenderDialog from "./GenderDialog";
import AgeDialog from "./AgeDialog";
import GET_USER_RECORD from "../../utils/queries/GetUserRecord";
import UPDATE_GENDER from "../../utils/queries/UpdateGender";
import UPDATE_AGE from "../../utils/queries/UpdateAge"

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
  const userEmail = useSelector((state) => state.user.email);
  const [openGenderDialog, setOpenGenderDialog] = React.useState(false);
  const [openAgeDialog, setOpenAgeDialog] = React.useState(false);
  const variables = { email: userEmail };
  const { data } = useQuery(GET_USER_RECORD, {
    variables: variables,
    skip: !userEmail,
  });
  const refetchRecord = {
    refetchQueries: [{ query: GET_USER_RECORD, variables: variables }],
  };
  const [updateGender] = useMutation(UPDATE_GENDER, refetchRecord);
  const [updateAge] = useMutation(UPDATE_AGE, refetchRecord);
  const gender = data?.getUserRecord?.gender;
  const age = data?.getUserRecord?.age;

  const handleGenderDialog = () => {
    setOpenGenderDialog(!openGenderDialog);
  };
  const handleAgeDialog = () => {
    setOpenAgeDialog(!openAgeDialog);
  };
  const handleSaveGender = (gender) => {
    updateGender({
      variables: {
        gender,
        email: userEmail,
      },
    });
  };
  const handleSaveAge = (age) => {
    updateAge({
      variables: {
        age,
        email: userEmail,
      },
    });
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
                secondary={userEmail}
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
                secondary={gender}
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
                secondary={age}
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
      <GenderDialog
        UserGender={gender}
        open={openGenderDialog}
        handleDialog={handleGenderDialog}
        handleSaveGender={handleSaveGender}
      />
      <AgeDialog
        open={openAgeDialog}
        handleDialog={handleAgeDialog}
        handleSaveAge={handleSaveAge}
        UserAge={age}

      />
    </>
  );
};

export default PersonalInfo;
