import React from "react";
import { makeStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";
import Switch from "@material-ui/core/Switch";
import { Box, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useMutation, useQuery } from "@apollo/react-hooks";
import USER_WANTS_PROMOTIONS_AND_TIPS_FLAG from "../../utils/queries/UpdateUserWantsPromotionsAndTipsFlag";
import USER_WANTS_REMINDERS_FLAG from "../../utils/queries/UpdateUserWantsRemindersFlag";
import USER_WANTS_NO_EMAILS_FLAG from "../../utils/queries/UpdateUserWantsNoEmails";
import GET_USER_RECORD from "../../utils/queries/GetUserRecord";
import Divider from "@material-ui/core/Divider";

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

const Notifications = () => {
  const classes = useStyles();
  const userEmail = useSelector((state) => state?.user?.email);
  const variables = { email: userEmail };
  const { data } = useQuery(GET_USER_RECORD, {
    variables: variables,
  });
  console.log(data, "data");
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
  });
  const refetchRecords = {
    refetchQueries: [{ query: GET_USER_RECORD, variables: variables }],
  };

  const [UpdatePromotionsAndTipsFlag] = useMutation(
    USER_WANTS_PROMOTIONS_AND_TIPS_FLAG,
    refetchRecords
  );
  const [updateRemindersFlag] = useMutation(
    USER_WANTS_REMINDERS_FLAG,
    refetchRecords
  );
  const [updateUserWantsNoEmails] = useMutation(
    USER_WANTS_NO_EMAILS_FLAG,
    refetchRecords
  );

  const handleChangeNotifications = (event) => {
    if (event.target.name === "checkedA") {
      UpdatePromotionsAndTipsFlag({
        variables: {
          email: userEmail,
          wantsPromotionsAndTips: event.target.checked,
        },
      });
    } else if (event.target.name === "checkedB") {
      updateRemindersFlag({
        variables: {
          email: userEmail,
          wantsReminders: event.target.checked,
        },
      });
    }
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleNoEmail = () => {
    updateUserWantsNoEmails({
      variables: {
        email: userEmail,
      },
    });
  };
  return (
    <Box className={classes.listBorders}>
      <Typography className={classes.heading}>Notifications</Typography>
      <List>
        <ListItem className={classes.listItem}>
          <Box display="flex" flex="1">
            <ListItemText
              className={classes.listItemText}
              primary="Promotions and tips"
              secondary="Receive promotions, product updates, surveys and more from Detourse."
            />
            <Box>
              <Switch
                checked={state.checkedA}
                onChange={handleChangeNotifications}
                color="primary"
                name="checkedA"
                inputProps={{ "aria-label": "primary checkbox" }}
              />{" "}
            </Box>{" "}
          </Box>
        </ListItem>
        <Divider />
        <ListItem className={classes.listItem}>
          <Box display="flex" flex="1">
            <ListItemText
              className={classes.listItemText}
              primary="Reminders"
              secondary="Receive booking reminders, pricing notices, and other reminders related to your activities on Detourse."
            />
            <Box>
              <Switch
                checked={state.checkedB}
                onChange={handleChangeNotifications}
                color="primary"
                name="checkedB"
                inputProps={{ "aria-label": "primary checkbox" }}
              />{" "}
            </Box>
          </Box>
        </ListItem>
        <Divider />
      </List>
      <Box>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleNoEmail}
        >
          Unsubscribe from All Emails
        </Button>
      </Box>
    </Box>
  );
};

export default Notifications;
