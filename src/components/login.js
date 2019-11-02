import React, { Component } from "react";
import '../App.css';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

class Login extends Component {
  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null && user['email'].split("@")[1] !== "iiitd.ac.in") {
        firebase.auth().signOut().then(() => {});
        //  alert("Use Only authorized Mail");
        this.props.history.push('/');
        alert('Use Valid Mail');
      }else{
        this.setState({ isSignedIn: !!user })
      }
    });
  }

  render() {
    return (
      <div className="Login">
         <h1 class="w3-center w3-margin">IIITD Guest House | Log In</h1>
        {this.state.isSignedIn ? (
         this.props.history.push('/')
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    )
  }
}

export default Login;