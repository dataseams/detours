import { Typography, Box, Divider } from "@material-ui/core";

const ItineraryDescription = props => {
  return (
    <Box m={10}>
      <Typography variant="h3" paragraph={true}>
        Your trip to Paris, France
      </Typography>
      <Divider variant="middle"></Divider>
      <Typography>This is a preview of your itinerary.</Typography>
      <Typography>
        &emsp;- You would spend a total of $176 per day including hotel,
        restaurant, and activities, for a total of 4 days.
      </Typography>
      <Typography>
        &emsp;- You would save an average of <b>20-30 hours </b>planning your
        trip.
      </Typography>
      <Typography>
        &emsp;- Your itinerary contains top-rated restaurants and experiences
        which directly match with your following interests.
      </Typography>
    </Box>
  );
};

export default ItineraryDescription;
