import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import connection from '../helpers/data/connection';

import Auth from '../components/auth/auth';
import MyNavBar from '../components/mynavbar/MyNavBar';
import BoardContainer from '../components/boardcontainer/BoardContainer';

import './App.scss';

connection();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    const loadComponent = () => {
      if (authed) {
        return <BoardContainer />;
      }
      return <Auth />;
    };

    return (
      <div className="App">
        <MyNavBar authed ={authed}/>
        {loadComponent()}
      </div>
    );
  }
}

export default App;
