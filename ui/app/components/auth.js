import React, { Component } from "react";
import firebase from "firebase/app";
import { useRouter } from "next/router";
import "firebase/auth";
import "isomorphic-unfetch";
import { Button, Divider, Avatar, Box } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { Menu, MenuItem, IconButton } from "@material-ui/core";

import clientCredentials from "../credentials/client";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  authButton: {
    textTransform: "none",
  },
}));

export async function getServerSideProps({ req, query }) {
  const user =
    req.session && req.session.decodedToken ? req.session.decodedToken : null;

  return {
    props: {
      user,
    },
  };
}

const Auth = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  if (!firebase.apps.length) {
    firebase.initializeApp(clientCredentials);
  }
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const setUserEmail = {
        type: "SET_USER",
        value: {
          userEmail: user.email,
          userDisplayName: user.displayName,
          userPhotoUrl: user.photoURL,
        },
      };
      dispatch(setUserEmail);
      console.log(process.env.LOGIN_API_URL);
      return user.getIdToken().then((token) => {
        // eslint-disable-next-line no-undef
        return fetch(process.env.LOGIN_API_URL, {
          method: "POST",
          // eslint-disable-next-line no-undef
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ token }),
        }).catch((e) => console.log(e));
      });
    } else {
      const setUserEmail = {
        type: "SET_USER",
        value: { userEmail: null, userDisplayName: null },
      };
      dispatch(setUserEmail);

      console.log(process.env.LOGOUT_API_URL);
      // eslint-disable-next-line no-undef
      fetch(process.env.LOGOUT_API_URL, {
        method: "POST",
        credentials: "same-origin",
      }).catch((e) => console.log(e));
    }
  });

  const userEmail = useSelector((state) => state.user.email);
  const userDisplayName = useSelector((state) => state.user.displayName);
  const userPhotoUrl = useSelector((state) => state.user.photoUrl);

  const handleLogin = (props) => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        const email = result.user.email;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage);
      });
    setAnchorEl(null);
  };

  const handleLogout = (props) => {
    firebase.auth().signOut();
  };
  const goToMyItinerariesPage = () => {
    setAnchorEl(null);
    router.push("/myItineraries");
  };
  const goToMyAccountPage = () => {
    setAnchorEl(null);
    router.push("/myAccount");
  };
  console.log("User: " + userEmail);

  return (
    <Box>
      {userEmail ? (
        <Box>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="primary"
          >
            <Avatar
              alt={userDisplayName}
              src={userPhotoUrl}
              className={classes.small}
            />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem disabled={true}>{userDisplayName}</MenuItem>
            <Divider />
            <MenuItem onClick={goToMyAccountPage}>My account</MenuItem>
            <MenuItem onClick={goToMyItinerariesPage}>My itineraries</MenuItem>
            <MenuItem onClick={handleLogout}>Log out</MenuItem>
          </Menu>
        </Box>
      ) : (
        <Button onClick={handleLogin} classes={{ label: classes.authButton }}>
          Log in
        </Button>
      )}
    </Box>
  );
};

export default Auth;
