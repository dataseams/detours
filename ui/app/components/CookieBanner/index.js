import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Typography } from "@material-ui/core";
import { useCookies } from "react-cookie";

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
    padding: "10px",
    [theme.breakpoints.down("xs")]: {
      padding: "5px",
    },
  },
  button: {
    padding: "0px 16px",
  },
  typography: {
    fontSize: "1em",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8em",
    },
  },
}));

const CookieBanner = () => {
  const classes = useStyles();
  const [cookies, setCookie] = useCookies(["acceptCookie"]);
  const cookieBanner = cookies.acceptCookie;

  useEffect(() => {
    if (typeof cookieBanner == "undefined") {
      setCookie("acceptCookie", "true", { path: "/" });
    }
  }, [cookieBanner]);
  const handleCookie = () => {
    setCookie("acceptCookie", "false", { path: "/" });
  };
  return (
    <>
      {cookieBanner === "true" && (
        <Box
          className={classes.listBorders}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <Typography className={classes.typography}>
              We use cookies to ensure that we give you the best experience on
              our website. If you continue to use this site we will assume that
              you are happy with it.
            </Typography>
          </Box>
          <Box ml={1} p={1}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleCookie}
            >
              Ok
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default CookieBanner;
