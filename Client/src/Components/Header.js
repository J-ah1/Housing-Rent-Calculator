import React from 'react';

function Header(props) {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h1>Rent Calculator</h1>
            <h1>Sign Out</h1>
        </div>
    );
}

export default Header;