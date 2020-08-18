/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import 'firebase/auth';

import './MyNavBar.scss';

class MyNavBar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
  }

  signMeOutEvent = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#"><i className="fab fa-pinterest fa-2x"></i></a>
      <ul className = "ml-auto">
      <li>
        {
          authed ? (<button className="btn btn-danger logOutBtn" onClick={this.signMeOutEvent}>Log Out</button>) : ''
        }
      </li>
      </ul>
      </nav>
    );
  }
}

export default MyNavBar;
