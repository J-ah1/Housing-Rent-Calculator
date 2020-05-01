import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import '../Styles/Header.css';

function signOut() {
    Cookies.remove("userID");
    axios.get(`http://localhost:8500/db.cfc?method=removeUserAuth`, {withCredentials: true})
        .then(res => console.log(res))
    console.log("USER REMOVED")
    window.location.reload()
}

function Header() {
    return (
        <nav id="header">
            <a id="header-title" className="navbar-brand" href="/" >Rent Calculator</a>
            <button className="btn btn-light" id='signOut' onClick={signOut}>Sign Out</button>
        </nav>
    );
}

export default Header;