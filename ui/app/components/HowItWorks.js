import {
  Box,
  Grid,
  Card,
  Typography,
  CardMedia,
  CardActions,
  CardActionArea,
  CardContent
} from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "center",
    maxWidth: "85%",
    backgroundColor: "#F6F6F6"
  },
  title: {
    alignSelf: "flex-start",
    paddingLeft: theme.spacing(2)
  },
  subtitle: {
    padding: theme.spacing(1, 1, 1, 1)
  },
  text: {
    padding: theme.spacing(1, 1, 1, 1)
  },
  mainGrid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3)
  },
  grid: {
    display: "flex",
    flexGrow: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center"
  },
  card: {
    display: "flex",
    flexDirection: "column",
    width: 300,
    margin: theme.spacing(2),
  },
  media: {
    height: 300,
    objectFit: "scale-down"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    minHeight: 150,
    padding: 10
  }
}));

function HowItWorks() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid className={classes.mainGrid}>
        <Typography className={classes.title}>How it works</Typography>
        <Grid className={classes.grid}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="/static/howitworks1.svg"
              title="Step 1"
              component="img"
            />
            <CardContent className={classes.content}>
              <Typography className={classes.subtitle}>STEP 1</Typography>
              <Typography
                className={classes.text}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                First, you fill out an approximately 10-minute-long
                questionnaire to let us know about all of your vacation
                preferences, including dining, activities, transportation, and
                more.
              </Typography>
            </CardContent>
        </Card>
        <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="/static/howitworks2.svg"
              title="Step 2"
              component="img"
            />
            <CardContent className={classes.content}>
              <Typography className={classes.subtitle}>STEP 2</Typography>
              <Typography
                className={classes.text}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                Then, our advanced data science model pulls data from
                thousands of outside sources (Yelp, Trip Advisor, Google
                Reviews) to aggregate the consistently top-rated experiences
                within your travel destination
              </Typography>
            </CardContent>
        </Card>
        <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="/static/howitworks3.svg"
              title="Step 3"
              component="img"
            />
            <CardContent className={classes.content}>
              <Typography className={classes.subtitle}>STEP 3</Typography>
              <Typography
                className={classes.text}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                Finally, we match your preferences to the top-rated
                experiences within your destination and build an optimized
                itinerary for your vacation. We show you a preview of that
                itinerary, and if you think that it's worth it, you can
                prurchase it for <b>just $10</b>.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HowItWorks;
