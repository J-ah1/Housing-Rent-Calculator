import React from 'react';
import Cookies from 'js-cookie';

import '../Styles/Header.css';

function signOut() {
    Cookies.remove("User");
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