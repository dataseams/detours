import React from "react";
import { Box, Typography, Icon } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
  listBorders: {
    boxShadow: "0px 3px 6px #00000026",
    borderRadius: "15px",
    marginTop: "65px",
    marginLeft: "25px",
    marginRight: "0px",

    [theme.breakpoints.down("xs")]: {
      marginLeft: "0",
      marginTop: "30px",
      width: "335px",
    },
    background: theme.palette.background.linearGradiant,
    padding: "30px",
  },
  heading: {
    fontSize: "26px",
    fontWeight: "600",
    color: theme.typography.color,
  },
  dates: {
    fontSize: "20px",
    color: theme.typography.color,
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "3px",
    border: "1px solid",
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.background.default,
    width:"30px",
    height:"30px"
  },
  button: {
    "& .MuiButton-label": {
      color: theme.typography.color,
    },
    padding: "6px 0px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "10px",
    },
  },
  icon: {
    color: theme.palette.primary.main,
    width:"22px",
    height:"22px"
  },
  line: {
    margin: "4px",
    height: "3px",
    width: "24px",
    background: `repeating-linear-gradient(to right,${theme.palette.primary.main} 0,${theme.palette.primary.main} 9px,transparent 9px,transparent 15px)`,
  },
}));
const SavedItinerariesDetails = () => {
  const classes = useStyles();

  return (
    <Box className={classes.listBorders}>
      <Typography className={classes.heading}>Paris, France</Typography>
      <Box display="flex" justifyContent="space-between">
        <Typography className={classes.dates}>
          November 24 - December 2
        </Typography>
        <Hidden mdDown>
          <Button className={classes.button} endIcon={<TrendingFlatIcon />}>
            View itinerary
          </Button>
        </Hidden>
      </Box>
      <Box display="flex" my={[1, 0, 0, 0]}>
        <Box display="flex" alignItems="center">
          <Box className={classes.iconContainer} border={2}>
            <DirectionsBikeIcon className={classes.icon} />
          </Box>
          <Box className={classes.line}></Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Box className={classes.iconContainer} border={2}>
            <DirectionsBikeIcon className={classes.icon} />
          </Box>
          <Box className={classes.line}></Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Box className={classes.iconContainer} border={2}>
            <DirectionsBikeIcon className={classes.icon} />
          </Box>
          <Box className={classes.line}></Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Box className={classes.iconContainer} border={2}>
            <DirectionsBikeIcon className={classes.icon} />
          </Box>
          <Box className={classes.line}></Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Box className={classes.iconContainer} border={2}>
            <DirectionsBikeIcon className={classes.icon} />
          </Box>
        </Box>
      </Box>
      <Hidden lgUp>
        <Button className={classes.button} endIcon={<TrendingFlatIcon />}>
          View itinerary
        </Button>
      </Hidden>
    </Box>
  );
};

export default SavedItinerariesDetails;
