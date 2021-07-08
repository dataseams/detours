import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  listBorders: {
    border: `1px solid ${theme.palette.primary.main}`,
    position: "fixed",
    right: "0",
    left: "0",
    bottom: "0",
    backgroundColor: theme.palette.background.default,
    zIndex: "1",
  },
  button: {
    padding: "0px 16px",
  },
}));

const CookieBanner = () => {
  const classes = useStyles();
  const [cookieDisplay, setCookieDisplay] = React.useState(true);
  const handleCookieDisplay = () => {
    setCookieDisplay(false);
  };
  return (
    <Box
      className={classes.listBorders}
      display={cookieDisplay ? "flex" : "none"}
      justifyContent="center"
      alignItems="center"
    >
      <Box>
        <Typography>
          We use cookies to ensure that we give you the best experience on our
          website. If you continue to use this site we will assume that you are
          happy with it.
        </Typography>
      </Box>
      <Box ml={1} p={1}>
        {" "}
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleCookieDisplay}
        >
          Ok
        </Button>
      </Box>
    </Box>
  );
};

export default CookieBanner;
