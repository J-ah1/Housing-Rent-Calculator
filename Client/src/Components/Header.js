import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import '../Styles/Header.css';

function signOut() {
    Cookies.remove("userID");
    axios.get(`http://localhost:8000/db.cfc?method=removeUserAuth`, {withCredentials: true})
        .then(res => console.log(res))
    console.log("USER REMOVED")
    window.location.reload()
}

function Header() {
    return (
        <div className="m-3" style={{display: 'flex', justifyContent: 'space-between'}}>
            <h1><a href="/" id="header">Rent Calculator</a></h1>
            <button id='signOut' onClick={signOut}>Sign Out</button>
        </div>
    );
}

export default Header;