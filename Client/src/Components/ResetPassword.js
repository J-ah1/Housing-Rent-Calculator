import React from 'react';


function ResetPassword(props) {
    return(
        <div>
            <label>Enter your new password</label>
            <input
                type='text'
                value={props.newPass}
                onChange={props.passHandler}
            >
            </input>
            <br />
            <label>Re-enter your new password</label>
            <input
                type='text'
                value={props.checkPass}
                onChange={props.checkHandler}
            >
            </input>
            <br />
            <button onClick={props.viewHandler}>Submit</button>
        </div>
    )
}

export default ResetPassword;