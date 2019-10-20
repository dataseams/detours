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
    color: "white",
    alignSelf: "flex-start",
    paddingLeft: theme.spacing(2)
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
    width: 200,
    margin: theme.spacing(2)
  },
  media: {
    height: 140
  },
  content: {
    height: 40,
    padding: 10
  },
  text: {
    fontSize: "1.1em"
  }
}));

function HowItWorks() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid className={classes.mainGrid}>
        <Typography className={classes.title}>
          See sample itineraries to:
        </Typography>
        <Grid className={classes.grid}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/static/paris.png"
                title="Paris, France"
              />
              <CardContent className={classes.content}>
                <Typography className={classes.text}>Paris, France</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/static/nyc.png"
                title="New York, NY"
              />
              <CardContent className={classes.content}>
                <Typography className={classes.text}>New York, NY</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/static/goldengate.png"
                title="San Francisco, CA"
              />
              <CardContent className={classes.content}>
                <Typography className={classes.text}>
                  San Francisco, CA
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HowItWorks;
