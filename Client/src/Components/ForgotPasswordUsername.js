import React from 'react';


function ForgotPasswordUsername(props) {
    return(
        <div className="forgot-password-input-container mt-2">
            <label className="font-weight-light mb-4" >Enter your username:</label>
            <input
                className="rounded"
                type='text'
                value={props.username}
                onChange={props.inputHandler}
            >
            </input>
            <button className="mt-5 btn text-white" onClick={props.viewHandler}>Submit</button>
        </div>
    )
}

export default ForgotPasswordUsername;

