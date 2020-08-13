import { Box, Grid, Typography, Divider } from "@material-ui/core";
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

const useMobileStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    fontSize: 18
  },
  title: {
    fontWeight: "bold",
    padding: theme.spacing(2, 0, 2, 0),
    fontSize: "1.22em"
  },
  price: {
    fontSize: "2.22em",
    fontWeight: "500",
    padding: theme.spacing(1, 0, 1, 0)
  },
  priceUnit: {
    fontSize: "1.33em",
    padding: theme.spacing(0, 0, 3, 0)
  },
  divider: {
    width: "90px",
    height: "2px",
    backgroundColor: theme.palette.primary.main,
    margin: theme.spacing(5, 0)
  },
}));

function Pricing(props) {
  const { isMobile } = props;
  const classes = isMobile ? useMobileStyles() : useStyles();

  return (
    isMobile ? (
      <Box className={classes.root} >
        <Typography className={classes.title}>Pricing</Typography>

        <Typography
          className={classes.price}
          variant="h2"
          component="h2"
          color="primary"
        >
          $3
        </Typography>
        <Typography
          className={classes.priceUnit}
          variant="h5"
          color="primary"
        >
          per month
        </Typography>
        <Typography>
          We believe that affordable and enjoyable travel should be
          accessible for anyone. We're also in beta. For these reasons,
          we've decided to make a full travel itinerary, regardless of
          destination or length of vacation, available for a subscription fee of
          $3.
      </Typography>
        <br />
        <Typography>
          This small fee will save you an average of 20 to 30 hours of
          planning your vacation and will give you access to an itinerary of
          top-rated experiences personalized specifically for you.
      </Typography>
        <Divider className={classes.divider}></Divider>
      </Box>
    ) : (
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
                  destination or length of vacation, available for a subscription fee of
                  $3.
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
                    $3
              </Typography>
                </Grid>
                <Grid className={classes.gridL3}>
                  <Typography
                    className={classes.priceUnit}
                    variant="h5"
                    color="primary"
                  >
                    per month
              </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )
  )
}

export default Pricing;
