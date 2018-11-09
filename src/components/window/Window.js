import React, { Component } from 'react';
import './window.css';

import AuthContext from '../../context/LogginContext';

import SignIn from '../signin/SignIn';
import LogOut from '../logout/LogOut';
import PhoneList from '../phoneList/PhoneList';

class App extends Component {
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
  //   fetch('http://138.68.67.244:4000/users', {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': 'Bearer 31217926ec387ff6e7a13a006d4c5dfba4beb6daecaa01b8036309eb36920074'
  //     }
  //   }).then(data =>
  //     data.json()
  //   ).then(data => {
  //     console.log('start');
      
  //     for(let i = 0, len = data.length; i < len; i++) {
  //       console.log(data[i]);
  //     }
  //     console.log(data.length);
  //     console.log('end');
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

export default App;
