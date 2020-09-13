import { Box, Grid, Typography, Divider } from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: theme.typography.fontSize,
    color: theme.typography.color,
    padding: theme.spacing(10, 15)
  },
  gridMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    flexGrow: 1
  },
  gridLeft: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    alignContent: "center",
  },
  gridRight: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "right",
    alignItems: "flex-end",
    alignContent: "center"
  },
  h2: {
    ...theme.h2.desktop,
    padding: theme.spacing(0, 0, 4, 0)
  },
  price: {
    fontSize: "100px",
    fontWeight: "400"
  },
  priceUnit: {
    fontSize: "36px"
  },
  body: {
    ...theme.body
  }
}));

const useMobileStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    fontSize: theme.typography.fontSize,
    color: theme.typography.color
  },
  h2: {
    padding: theme.spacing(2, 0, 2, 0),
    ...theme.h2.mobile
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
  body: {
    ...theme.body
  }
}));

function Pricing(props) {
  const { isMobile } = props;
  const classes = isMobile ? useMobileStyles() : useStyles();

  return (
    isMobile ? (
      <Box className={classes.root} >
        <Typography className={classes.h2}>Pricing</Typography>

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
        <Typography className={classes.body}>
          We believe that affordable and enjoyable travel should be
          accessible for anyone. We're also in beta. For these reasons,
          we've decided to make a full travel itinerary, regardless of
          destination or length of vacation, available for a subscription fee of
          $3.
        </Typography>
        <br />
        <Typography className={classes.body}>
          This small fee will save you an average of 20 to 30 hours of
          planning your vacation and will give you access to an itinerary of
          top-rated experiences personalized specifically for you.
        </Typography>
        <Divider className={classes.divider}></Divider>
      </Box>
    ) : (
        <Box className={classes.root}>
          <Typography className={classes.h2}>Pricing</Typography>
          <Grid className={classes.gridMain}>
            <Grid className={classes.gridLeft} item xs={8}>
              <Typography className={classes.body}>
                We believe that affordable and enjoyable travel should be
                accessible for anyone. We're also in beta. For these reasons,
                we've decided to make a full travel itinerary, regardless of
                destination or length of vacation, available for a subscription fee of
                $3.
                <br></br>
                <br></br>
                This small fee will save you an average of 20 to 30 hours of
                planning your vacation and will give you access to an itinerary of
                top-rated experiences personalized specifically for you.
              </Typography>
            </Grid>
            <Grid className={classes.gridRight}>
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
                variant="h3"
                component="h3"
                color="primary"
              >
                per month
                </Typography>
            </Grid>
          </Grid>
        </Box>
      )
  )
}

export default Pricing;
