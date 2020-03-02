import React from 'react';


function ForgotPasswordUsername(props) {
    return(
        <div>
            <label>Enter your username</label>
            <input
                type='text'
                value={props.username}
                onChange={props.inputHandler}
            >
            </input>
            <button onClick={props.viewHandler}>Submit</button>
        </div>
    )
}

export default ForgotPasswordUsername;

