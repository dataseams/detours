import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "isomorphic-unfetch";
import { Button, Divider, Avatar } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

import { Menu, MenuItem, IconButton } from '@material-ui/core';

import clientCredentials from "../credentials/client";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
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
}));

export async function getServerSideProps({ req, query }) {
  const user = req.session && req.session.decodedToken ? req.session.decodedToken : null

  return {
    props: {
      user
    },
  }
}

const Auth = props => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  };
  const handleClose = () => {
    setAnchorEl(null)
  };
  const open = Boolean(anchorEl);

  if (!firebase.apps.length) {
    firebase.initializeApp(clientCredentials)
  }
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const updateUserEmail = {
        type: "UPDATE_USER", value: {
          userEmail: user.email,
          userDisplayName: user.displayName,
          userPhotoUrl: user.photoURL
        }
      };
      dispatch(updateUserEmail);

      return user
        .getIdToken()
        .then(token => {
          // eslint-disable-next-line no-undef
          return fetch('/api/login', {
            method: 'POST',
            // eslint-disable-next-line no-undef
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'same-origin',
            body: JSON.stringify({ token }),
          })
        })
    } else {
      const updateUserEmail = { type: "UPDATE_USER", value: { userEmail: null, userDisplayName: null } };
      dispatch(updateUserEmail);

      // eslint-disable-next-line no-undef
      fetch('/api/logout', {
        method: 'POST',
        credentials: 'same-origin',
      })
    }
  })

  const userEmail = useSelector(state => state.user.email);
  const userDisplayName = useSelector(state => state.user.displayName);
  const userPhotoUrl = useSelector(state => state.user.photoUrl);

  const handleLogin = props => {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    setAnchorEl(null);
  }

  const handleLogout = props => {
    firebase.auth().signOut()
  }

  console.log("User: " + userEmail);

  return (
    <div>
      {userEmail ? (
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="primary"
          >
            <Avatar alt={userDisplayName} src={userPhotoUrl} className={classes.small} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem disabled={true}>{userDisplayName}</MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>Log out</MenuItem>
          </Menu>
        </div>
      ) : (<Button onClick={handleLogin}>Log in</Button>)}
    </div>
  )
}

export default Auth;
