import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { useQuery } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { Link } from "@material-ui/core";
import GET_LAST_SURVEY_RESPONSE from "../../utils/queries/GetLastSurveyResponse";

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

const SurveyAnswer = ({ user }) => {
  const classes = useStyles();
  const UserEmail = user.email;
  const [answers, setAnswers] = useState({});

  const variables = { travelerEmail: UserEmail };
  const { data } = useQuery(GET_LAST_SURVEY_RESPONSE, {
    variables: variables,
    skip: !UserEmail,
  });
  const convertDate = (currentDate) => {
    const date = new Date(currentDate);
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.toLocaleString("default", { day: "2-digit" });
    const year = date.toLocaleString("default", { year: "numeric" });
    return `${month} ${day} ${year}`;
  };
  const lastSurveyDate = data?.getLastSurveyResponse?.timeStamp;
  const parseAnswers = () => {
    setAnswers(JSON.parse(data?.getLastSurveyResponse.json));
  };
  useEffect(() => {
    if (data) {
      parseAnswers();
    }
  }, [data]);
  const loopThroughObjectValues = (obj) => {
    let array = [];
    for (let key in obj) {
      if (obj[key]) {
        array.push(key);
      }
    }
    return array.join();
  };
  return (
    <Box className={classes.listBorders}>
      <Typography className={classes.heading}>Survey Answers</Typography>
      <Typography>
        The last time you answered our survey was{" "}
        <span className={classes.date}>{convertDate(lastSurveyDate)}</span>. You
        can modify individual answers below or you can choose to{" "}
        <Link href="/questionnaire" underline="always">
          retake the survey.
        </Link>
      </Typography>
      <List component="ol">
        <ListItem className={classes.listItem}>
          <Box display="flex" flex="1">
            <ListItemText
              className={classes.listItemText}
              primary="1. Which city do you want to travel to?"
              secondary={answers?.city}
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
              primary="2. When are you planning to take your vacation?"
              secondary={`  ${convertDate(answers?.travelDates?.[0])} -
               ${convertDate(answers?.travelDates?.[1])}`}
            />
            <Box>
              <Button disabled className={classes.button}>
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
              primary="3. Who are you traveling with?"
              secondary={answers?.companion}
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
              primary="4. What do you like to do when you travel?"
              secondary={loopThroughObjectValues(answers?.generalPreferences)}
            />
            <Box>
              <Button disabled className={classes.button}>
                Edit
              </Button>
            </Box>
          </Box>
        </ListItem>
        <Divider />
        <Divider />
        <ListItem className={classes.listItem}>
          <Box display="flex" flex="1">
            <ListItemText
              className={classes.listItemText}
              primary="5(a). What is your preferred price point?"
              secondary={answers?.dining?.pricePoint}
            />
            <Box>
              <Button disabled className={classes.button}>
                Edit
              </Button>
            </Box>
          </Box>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Box display="flex" flex="1">
            <ListItemText
              className={classes.listItemText}
              primary="5(b). Which dining environments do you prefer?"
              secondary={loopThroughObjectValues(answers?.dining?.environment)}
            />
          </Box>
        </ListItem>
      </List>
    </Box>
  );
};
function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(SurveyAnswer);
