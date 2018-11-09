import React from 'react';

export default React.createContext({
    isAuth: !(localStorage.getItem('token') === 'null'),
    toggleAuth: () => {}
});