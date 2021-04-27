import { Typography, Box, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(10, 10, 5, 10),
    fontSize: 18,
  },
  title: {
    fontSize: "2.68em",
  },
  divider: {
    width: "90px",
    height: "2px",
    backgroundColor: theme.palette.primary.main,
  },
  descParagraph: {
    paddingTop: "1em",
  },
  descItem: {
    paddingLeft: "1em",
  },
  tags: {
    display: "flex",
    padding: "1em 0 1em 2em",
    flexWrap: "wrap",
  },
  tag: {
    color: theme.palette.primary.main,
  },
}));

const useMobileStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(10, 0, 3, 0),
  },
  title: {
    fontSize: "2em",
  },
  divider: {
    width: "25%",
    height: "2px",
    backgroundColor: theme.palette.primary.main,
  },
  descParagraph: {
    paddingTop: "1em",
  },
  descItem: {
    paddingLeft: "0em",
  },
  tags: {
    display: "flex",
    padding: theme.spacing(1, 0, 0, 0),
    flexWrap: "wrap",
  },
  tag: {
    color: theme.palette.primary.main,
  },
}));

const TagBox = (props) => {
  const { children, classes } = props;
  return (
    <Box border={1} padding={1} margin={0.5} className={classes.tag}>
      {children}
    </Box>
  );
};

const ItineraryDescription = (props) => {
  const { fullItinerary, isMobile } = props;
  const classes = isMobile ? useMobileStyles() : useStyles();
  const summary = {
    cityName:
      fullItinerary.city.name +
      ", " +
      (fullItinerary.city.state || fullItinerary.city.country),
    spendingPerDay: fullItinerary.spendingPerDay,
    hoursSaved: fullItinerary.hoursSaved,
    interestsMatched: fullItinerary.interestsMatched,
  };

  return (
    <Box className={classes.root}>
      <Typography className={classes.title} variant="h3" paragraph={true}>
        Your trip to {summary.cityName}
      </Typography>
      <Divider className={classes.divider}></Divider>
      <Typography className={classes.descParagraph}>
        This is a preview of your itinerary.
      </Typography>
      <Typography className={classes.descItem}>
        - You would spend a total of {summary.spendingPerDay} per day including
        hotel, restaurant, and activities, for a total of 4 days.
      </Typography>
      <Typography className={classes.descItem}>
        - You would save an average of <b>{summary.hoursSaved} </b>planning your
        trip.
      </Typography>
      <Typography className={classes.descItem}>
        - Your itinerary contains top-rated restaurants and experiences which
        directly match with your following interests.
      </Typography>
      <Box className={classes.tags}>
        {summary.interestsMatched.map((interest, index) => (
          <TagBox classes={classes} key={index}>
            {interest}
          </TagBox>
        ))}
      </Box>
    </Box>
  );
};

export default ItineraryDescription;
