import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "isomorphic-unfetch";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";

import clientCredentials from "../credentials/client";

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

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      firebase: this.firebase
    }
  }

  componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(clientCredentials)
    }
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
    if (user) {
      console.log("User: " + user.displayName)
      console.log("Email: " + user.email)
    } else {
      console.log("User: anonymous")
    }

    return (
      <div>
        {user ? (
          <Button onClick={this.handleLogout}>Log out</Button>
        ) : (<Button onClick={this.handleLogin}>Log in</Button>)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {user: state.user}
}

export default connect(mapStateToProps)(Auth);
