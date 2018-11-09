import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import './signin.css';
import AuthContext from '../../context/LogginContext';

class SignIn extends Component {
    static contextType = AuthContext;

    state = {
        login: '',
        password: '',
        incorrect: false
    }

    changeLogin = (event) => {
        this.setState({
            login: event.target.value
        })
    }

    changePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    sigin = (event) => {
        event.preventDefault();

        if (this.state.login === 'admin' &&
            this.state.password === '123456') {
            localStorage.setItem('isAuthLab5', 'admin');
            this.context.toggleAuth();
        } else {
            this.setState({
                incorrect: true
            })
        };

        this.setState({
            login: '',
            password: ''
        });
    }

    onFocus = () => {
        this.setState({
            incorrect: false
        })
    }

    render() {
        const inputStyles = classNames({
            "signin-input": true,
            "signin-input-false": this.state.incorrect
        });
        return (
            <Fragment>
                {!this.context.isAuth ?
                    <form className="signin-conteiner">
                        <div>
                            <label htmlFor="signin-label-login" className="signin-label">Login: </label>
                            <input
                                id="signin-label-login"
                                className={inputStyles}
                                type="text"
                                onFocus={this.onFocus}
                                value={this.state.login}
                                onChange={this.changeLogin}
                            />
                        </div>
                        <div>
                            <label htmlFor="signin-label-password" className="signin-label">Password: </label>
                            <input
                                id="signin-label-password"
                                className={inputStyles}
                                type="password"
                                value={this.state.password}
                                onChange={this.changePassword}
                            />
                        </div>
                        <div>
                            <button
                                className="signin-button"
                                onClick={this.sigin}
                            >
                                Sign In
                            </button>
                        </div>
                    </form> : null}
            </Fragment>
        );
    }
}

export default SignIn;
