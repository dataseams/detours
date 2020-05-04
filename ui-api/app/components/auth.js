import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "isomorphic-unfetch";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { MenuIcon, AccountCircle } from '@material-ui/icons';
import { Menu, MenuItem, IconButton } from '@material-ui/core';

import clientCredentials from "../credentials/client";

export async function getServerSideProps({ req, query }) {
  const user = req.session && req.session.decodedToken ? req.session.decodedToken : null

  return {
    props: {
      user
    },
  }
}

const handleLogin = props => {
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
}

const handleLogout = props => {
  firebase.auth().signOut()
}

const Auth = props => {
  const dispatch = useDispatch();

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  if (!firebase.apps.length) {
    firebase.initializeApp(clientCredentials)
  }
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const updateUserEmail = { type: "UPDATE_USER", value: user.email };
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
      const updateUserEmail = { type: "UPDATE_USER", value: null };
      dispatch(updateUserEmail);

      // eslint-disable-next-line no-undef
      fetch('/api/logout', {
        method: 'POST',
        credentials: 'same-origin',
      })
    }
  })

  const userEmail = useSelector(state => state.userEmail);
  console.log("User: " + userEmail);

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="primary"
      >
        <AccountCircle />
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
        {userEmail ? (
          <MenuItem onClick={handleLogout}>Log out</MenuItem>) : (
            <MenuItem onClick={handleLogin}>Log in</MenuItem>)}
      </Menu>
    </div >
  )
}

export default Auth;
