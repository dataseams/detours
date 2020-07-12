import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "isomorphic-unfetch";
import { Box } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

import clientCredentials from "../credentials/client";
import LogInOutButton from "./LogInOutButton";

export async function getServerSideProps({ req, query }) {
  const user = req.session && req.session.decodedToken ? req.session.decodedToken : null

  return {
    props: {
      user
    },
  }
}

const Auth = props => {
  const dispatch = useDispatch();

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
          return fetch(process.env.LOGIN_API_URL, {
            method: 'POST',
            // eslint-disable-next-line no-undef
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'same-origin',
            body: JSON.stringify({ token }),
          }).catch(e => console.log(e))
        })
    } else {
      const updateUserEmail = {
        type: "UPDATE_USER",
        value: {
          userEmail: null,
          userDisplayName: null
        }
      };
      dispatch(updateUserEmail);

      // eslint-disable-next-line no-undef
      fetch(process.env.LOGOUT_API_URL, {
        method: 'POST',
        credentials: 'same-origin',
      }).catch(e => console.log(e))
    }
  })

  const userEmail = useSelector(state => state.user.email);

  const handleLogin = props => {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  const handleLogout = props => {
    firebase.auth().signOut()
  }
  console.log("User: " + userEmail);

  return (
    <Box width="100%">
      {userEmail ? (
        (<LogInOutButton text="Log Out" onClick={handleLogout} />)
      ) : (<LogInOutButton text="Log In" onClick={handleLogin} />)}
    </Box>
  )
}

export default Auth;
