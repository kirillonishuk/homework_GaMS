import React, { Component } from 'react';
import './window.css';

import AuthContext from '../../context/LogginContext';

import SignIn from '../signin/SignIn';
import LogOut from '../logout/LogOut';
import PhoneList from '../phoneList/PhoneList';

class Window extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      isAuth: !(localStorage.getItem('isAuthLab5') === 'null')
    };
  }

  toggleAuth = () => {
    this.setState(prevState => {
      return {
        isAuth: !prevState.isAuth
      };
    });
  }

  // componentDidMount = () => {
  //   fetch('http://localhost:4000/users?size=500&page=1', {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': 'Bearer testToken'
  //     }
  //   }).then(data =>
  //     data.json()
  //   ).then(data => {
  //     console.log('start 1');
  //     console.log(data.length);
  //     console.log('---');
  //   })
  // }

  render() {
    return (
      <AuthContext.Provider
        value={{ isAuth: this.state.isAuth, toggleAuth: this.toggleAuth }}
      >
        <div className="container">
          <SignIn />
          <PhoneList />
          <LogOut />
        </div>
      </AuthContext.Provider>
    );
  }
}

export default Window;
