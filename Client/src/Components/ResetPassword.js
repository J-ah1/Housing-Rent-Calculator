import React from 'react';


function ResetPassword(props) {
    return(
        <div className="forgot-password-input-container mt-2">
            <label className="font-weight-light mb-4">Enter your new password:</label>
            <input
                className="rounded"
                type='password'
                value={props.newPass}
                onChange={props.passHandler}
            >
            </input>
            <br />
            <label className="font-weight-light mb-4">Re-enter your new password:</label>
            <input
                className="rounded"
                type='password'
                value={props.checkPass}
                onChange={props.checkHandler}
            >
            </input>
            <br />
            <button className="mt-2 btn text-white" onClick={props.viewHandler}>Submit</button>
        </div>
    )
}

export default ResetPassword;