import React from 'react';
import Cookies from 'js-cookie';

function test() {
    Cookies.remove("User");
    console.log("USER REMOVED")
    window.location.reload()
}

function Header(props) {
    return (
        <div className="m-3" style={{display: 'flex', justifyContent: 'space-between'}}>
            <h1>Rent Calculator</h1>
            <button onClick={test}>Sign Out</button>
        </div>
    );
}

export default Header;