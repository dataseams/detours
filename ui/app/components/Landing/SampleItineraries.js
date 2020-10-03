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
    padding: theme.spacing(5, 15)
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
    ...theme.body,
    fontWeight: 500,
  }
}));

const usePopoverClasses = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%"
  },
  paper: {
    width: "95%",
    height: "95%"
  }
}))

const useMobileStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    fontSize: theme.typography.fontSize,
    color: theme.typography.color,
    padding: theme.spacing(4, 1, 4, 1)
  },
  h2: {
    color: "white",
    ...theme.h2.mobile,
    padding: theme.spacing(0, 0, 1, 4)
  },
  gridList: {
    flexWrap: "nowrap",
    padding: theme.spacing(2, 4),
    height: 274,
  },
  cardContainer: {
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
  { city: "LA", title: "Paris, France", image: "static/paris.png" },
  { city: "NYC", title: "New York, NY", image: "static/nyc.png" },
  { city: "SF", title: "San Francisco, CA", image: "static/goldengate.png" },
  { city: "CHI", title: "Barcelona, Spain", image: "static/barcelona.png" },
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
        <GridList
          className={classes.gridList}
          cols={1.4}
          spacing={2 * 8}
          cellHeight="auto"
        >
          {itineraries.map((itinerary, index) => (
            <GridListTile
              key={index}
              classes={{ tile: classes.cardContainer }}
              onClick={() => window.open("itinerarysample?city=" + itinerary.city, "_blank")}
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
    ) : (
        <Box className={classes.root}>
          <Typography className={classes.h2}>
            See sample itineraries to:
            </Typography>
          <Grid className={classes.grid}>
            {itineraries.map((itinerary, index) => (
              <Box onClick={() => window.open("itinerarysample?city=" + itinerary.city, "_blank")}>
                <Itinerary
                  key={index}
                  classes={classes}
                  itinerary={itinerary}
                  index={index}
                />
              </Box>
            ))}
          </Grid>
        </Box>
      )
  )
}

export default SampleItineraries;
