import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'isomorphic-unfetch'
import { Button, Typography, Box } from "@material-ui/core";
import clientCredentials from '../credentials/client'

export async function getServerSideProps({ req, query }) {
  // const user = req && req.session ? req.session.decodedToken : null
  // don't fetch anything from firebase if the user is not found
  // const snap = user && await req.firebaseServer.database().ref('messages').once('value')
  // const messages = snap && snap.val()
  const user = req.session && req.session.decodedToken ? req.session.decodedToken : null

  const messages = null
  return {
    props: {
      user,
      messages,
    },
  }
}

export default class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
    }
  }

  componentDidMount() {
    firebase.initializeApp(clientCredentials)

    if (this.state.user) this.addDbListener()

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user })
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
        this.setState({ user: null })
        // eslint-disable-next-line no-undef
        fetch('/api/logout', {
          method: 'POST',
          credentials: 'same-origin',
        })
      }
    })
  }

  handleLogin() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  handleLogout() {
    firebase.auth().signOut()
  }

  render() {
    const { user } = this.state
    console.log(user)

    return (
      <Box flexDirection="row" flexWrap="nowrap">
        {user ? (
          <Box flexDirection="row" flexWrap="nowrap">
            <Typography>{user.displayName}</Typography>
            <Button onClick={this.handleLogout}>Logout</Button>
          </Box>
        ) : (
            <Button onClick={this.handleLogin}>Login</Button>
          )}
      </Box>
    )
  }
}
