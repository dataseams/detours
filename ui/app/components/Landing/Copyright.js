import React from "react";
import MuiLink from "@material-ui/core/Link";
import { Typography, makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  bottomBox: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(5),
  },
  text: {
    color: "white",
  },
}));

function Copyright() {
  const classes = useStyles();

  return (
    <Box className={classes.bottomBox}>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        className={classes.text}
      >
        {"Copyright © "}
        <MuiLink color="inherit" href="https://www.dataseams.com">
          Data Seams
        </MuiLink>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}

export default Copyright;
