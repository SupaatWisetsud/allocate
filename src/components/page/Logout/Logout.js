import React from 'react'
import {Redirect} from 'react-router-dom';

const Logout = () => {

    localStorage.removeItem("nodeToken");

    return (
        <Redirect to="/login" />
    )
}

export default Logout