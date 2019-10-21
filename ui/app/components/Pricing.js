import { Box, Grid, Typography } from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(10, 5, 10, 10)
  },
  mainGrid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  gridL1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    flexGrow: 1
  },
  gridL2: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    alignContent: "center",
    flexGrow: 1,
    padding: theme.spacing(2, 3, 2, 2)
  },
  gridL3: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    padding: theme.spacing(0, 0, 0, 2)
  },
  title: {
    fontWeight: "bold",
    padding: theme.spacing(0, 0, 0, 2)
  },
  price: {
    fontSize: "100px",
    fontWeight: "400"
  },
  priceUnit: {
    fontSize: "36px"
  }
}));

function Pricing() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid className={classes.mainGrid}>
        <Grid className={classes.gridL1}>
          <Typography className={classes.title}>Pricing</Typography>
        </Grid>
        <Grid className={classes.gridL1}>
          <Grid className={classes.gridL2} item xs={8}>
            <Typography>
              We believe that affordable and enjoyable travel should be
              accessible for anyone. We're also in beta. For these reasons,
              we've decided to make a full travel itinerary, regardless of
              destination or length of vacation, available for a flat fee of
              $10.
            </Typography>
            <br />
            <Typography>
              This small fee will save you an average of 20 to 30 hours of
              planning your vacation and will give you access to an itinerary of
              top-rated experiences personalized specifically for you.
            </Typography>
          </Grid>
          <Grid className={classes.gridL2}>
            <Grid className={classes.gridL3}>
              <Typography
                className={classes.price}
                variant="h2"
                component="h2"
                color="primary"
              >
                $10
              </Typography>
            </Grid>
            <Grid className={classes.gridL3}>
              <Typography
                className={classes.priceUnit}
                variant="h5"
                color="primary"
              >
                per itinerary
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Pricing;
