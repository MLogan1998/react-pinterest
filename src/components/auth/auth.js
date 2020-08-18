import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

class Auth extends React.Component {
  logInClick = (e) => {
    e.preventDefault();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider);
  }

  render() {
    return (
      <div className="auth">
        <button className="btn btn-danger mt-2" onClick={this.logInClick}>Google Log In</button>
      </div>
    );
  }
}

export default Auth;
