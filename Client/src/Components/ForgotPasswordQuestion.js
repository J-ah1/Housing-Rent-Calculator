import React from 'react';

function ForgotPasswordQuestion(props) {
    return (
        <div className="forgot-password-question-form">
            <label>{props.question}</label>
            <input
                type='text'
                onChange={props.inputHandler}
                value={props.answer}
            >
            </input>
            <button onClick={props.viewHandler}>Submit</button>
        </div>
    );
}

export default ForgotPasswordQuestion;


