import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent
} from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(10)
  },
  mainGrid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  gridL1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  card: {
    padding: theme.spacing(2, 2, 2, 2),
    display: "flex",
    flexDirection: "column",
    width: 300,
    margin: theme.spacing(1),
    background: "none",
    boxShadow: "none"
  },
  gridL3: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1
  },
  title: {
    fontWeight: "bold",
    padding: theme.spacing(0, 0, 0, 2)
  },
  media: {
    height: "150px",
    clipPath: "circle(45px at center)",
    objectFit: "contain"
  },
  content: {
    height: 40,
    padding: 10
  },
  quote: {
    padding: theme.spacing(2)
  },
  signature: {
    fontStyle: "italic",
    padding: theme.spacing(2, 0, 0, 0)
  }
}));

function Testimonials() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid className={classes.mainGrid}>
        <Grid className={classes.title}>
          <Typography className={classes.title}>
            What our customers say
          </Typography>
        </Grid>
        <Grid className={classes.gridL1}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="/static/kathleen.png"
              title="Kathleen Brown"
              component="img"
            />
            <CardContent>
              <Grid className={classes.gridL3}>
                <img src="/static/left_quotes.svg" className={classes.quote}></img>
                <Typography>
                  This travel agent and concierge rolled into one will
                  construct a highly detailed itinerary for you that includes
                  the best restaurants, sights, and events for your trip.
                </Typography>
                <img src="/static/right_quotes.svg" className={classes.quote}></img>
                <Typography className={classes.signature}>Kathelen Brown</Typography>
              </Grid>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="/static/kathleen.png"
              title="Kathleen Brown"
              component="img"
            />
            <CardContent>
              <Grid className={classes.gridL3}>
                <img src="/static/left_quotes.svg" className={classes.quote}></img>
                <Typography>
                  This travel agent and concierge rolled into one will
                  construct a highly detailed itinerary for you that includes
                  the best restaurants, sights, and events for your trip.
                </Typography>
                <img src="/static/right_quotes.svg" className={classes.quote}></img>
                <Typography className={classes.signature}>Kathelen Brown</Typography>
              </Grid>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="/static/kathleen.png"
              title="Kathleen Brown"
              component="img"
            />
            <CardContent>
              <Grid className={classes.gridL3}>
                <img src="/static/left_quotes.svg" className={classes.quote}></img>
                <Typography>
                  This travel agent and concierge rolled into one will
                  construct a highly detailed itinerary for you that includes
                  the best restaurants, sights, and events for your trip.
                </Typography>
                <img src="/static/right_quotes.svg" className={classes.quote}></img>
                <Typography className={classes.signature}>Kathelen Brown</Typography>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Testimonials;
