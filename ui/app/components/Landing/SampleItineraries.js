import {
  Box,
  Grid,
  Card,
  Typography,
  CardMedia,
  CardActionArea,
  CardContent,
  GridList,
  GridListTile
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "left",
    fontSize: theme.typography.fontSize,
    backgroundColor: theme.palette.primary.main,
    color: theme.typography.color,
    padding: theme.spacing(5, 16)
  },
  h2: {
    color: "white",
    paddingBottom: theme.spacing(2),
    ...theme.h2.desktop
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-between",
    flexWrap: "wrap",
    margin: theme.spacing(0, -2)
  },
  card: {
    width: 200,
    margin: theme.spacing(2, 2)
  },
  media: {
    height: 140
  },
  content: {
    height: 50,
    padding: 10
  },
  body: {
    paddingLeft: theme.spacing(1),
    ...theme.body
  }
}));

const useMobileStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    fontSize: theme.typography.fontSize,
    color: theme.typography.color,
    padding: theme.mainContainer.mobile.padding
  },
  h2: {
    color: "white",
    ...theme.h2.mobile,
    paddingBottom: theme.spacing(1)
  },
  scrollContainer: {
    display: "flex",
    flexDirection: "row"
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    padding: theme.spacing(2, 0),
    height: 274
  },
  cardContainer: {
    padding: theme.spacing(0),
    height: 234
  },
  card: {
    width: "100%"
  },
  media: {
    height: 170
  },
  content: {
    height: 60,
    paddingLeft: 10
  },
  body: {
    paddingLeft: theme.spacing(1),
    fontWeight: 500,
    ...theme.body
  }
}));

const itineraries = [
  { title: "Paris, France", image: "static/paris.png" },
  { title: "New York, NY", image: "static/nyc.png" },
  { title: "San Francisco, CA", image: "static/goldengate.png" },
  { title: "Barcelona, Spain", image: "static/barcelona.png" },
];

const Itinerary = props => {
  const { classes, itinerary, index } = props;

  return (
    <Card key={index} className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={itinerary.image}
          title={itinerary.title}
        />
        <CardContent className={classes.content}>
          <Typography className={classes.body}>{itinerary.title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

function SampleItineraries(props) {
  const { isMobile } = props;
  const classes = isMobile ? useMobileStyles() : useStyles();

  return (
    (isMobile) ? (
      <Box className={classes.root}>
        <Typography className={classes.h2}>
          See sample itineraries to:
        </Typography>
        <Box className={classes.scrollContainer}>
          <GridList
            className={classes.gridList}
            cols={1.5}
            spacing={8 * 2}
          >
            {itineraries.map((itinerary, index) => (
              <GridListTile
                key={index}
                className={classes.cardContainer}
                classes={{tile: classes.cardContainer}}
              >
                <Itinerary
                  classes={classes}
                  itinerary={itinerary}
                  index={index}
                />
              </GridListTile>
            ))}
          </GridList>
        </Box>
      </Box>
    ) : (
        <Box className={classes.root} >
          <Typography className={classes.h2}>
            See sample itineraries to:
            </Typography>
          <Grid className={classes.grid}>
            {itineraries.map((itinerary, index) => (
              <Itinerary
                key={index}
                classes={classes}
                itinerary={itinerary}
                index={index}
              />
            ))}
          </Grid>
        </Box>
      )
  )
}

export default SampleItineraries;
