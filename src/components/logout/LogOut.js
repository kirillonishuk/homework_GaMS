import React, { Component, Fragment } from 'react';
import './logout.css';
import AuthContext from '../../context/LogginContext';

class LogOut extends Component {
    static contextType = AuthContext;

    logout = (event) => {
        event.preventDefault();

        localStorage.setItem('isAuthLab5', null);
        this.context.toggleAuth();
    }

    render() {
        return (
            <Fragment>
                {this.context.isAuth ?
                    <button
                        className="logout-button"
                        onClick={this.logout}
                    >
                        Log Out
                    </button> : null}
            </Fragment>
        );
    }
}

export default LogOut;
