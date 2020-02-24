import { Typography, Box, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  descParagraph: {
    paddingTop: "1em"
  },
  descItem: {
    paddingLeft: "1em"
  },
  divider: {
    width: "90px",
    height: "2px",
    backgroundColor: "#5865bc"
  },
  tags: {
    display: "flex",
    padding: "1em 0 1em 2em",
    flexWrap: "wrap"
  },
  tag: {
    color: "#5865bc"
  }
}));

const TagBox = props => {
  const { children, classes } = props;
  return (
    <Box border={1} padding={1} margin={0.5} className={classes.tag}>
      {children}
    </Box>
  );
};

const ItineraryDescription = props => {
  const { summary } = props;
  const classes = useStyles();

  return (
    <Box marginTop={10} marginLeft={10} marginRight={10} marginBottom={5}>
      <Typography variant="h3" paragraph={true}>
        Your trip to {summary.city}
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
          <TagBox classes={classes} key={index}>{interest}</TagBox>
        ))}
      </Box>
    </Box>
  );
};

export default ItineraryDescription;
