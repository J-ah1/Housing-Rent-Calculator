import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import '../Styles/Header.css';

function signOut() {
    Cookies.remove("userID");
<<<<<<< HEAD
    axios.get(`http://localhost:8500/db.cfc?method=removeUserAuth`, {withCredentials: true})
=======
    axios.get(`http://localhost:8000/db.cfc?method=removeUserAuth`, {withCredentials: true})
>>>>>>> 2b6e3e9942a929e2465261e657bce21f95450466
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