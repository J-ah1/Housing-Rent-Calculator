import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';


import ForgotPasswordUsername from './ForgotPasswordUsername';
import ForgotPasswordQuestion from './ForgotPasswordQuestion';
import ResetPassword from './ResetPassword';

import '../Styles/ForgotPassword.css';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            page: 1,
            answer: '',
            securityQuestions: [
                "What is your mother’s maiden name? ",
                "What was the name of your first pet? ",
                "What was the name of your elementary school? ",
                "What is your favorite movie? ",
                "What is your favorite book? "
            ],
            questionIndex: null,
            newPassword: '',
            checkNew: '',
            redirect: false
        }
        this.handleViewChange = this.handleViewChange.bind(this);
    }
    
    handleUsernameChange = (e) => {
        let username = e.target.value;
        this.setState({username})
    }

    handleAnswerChange = (e) => {
        let answer = e.target.value;
        this.setState({answer})
    }

    handlePassChange = (e) => {
        let newPassword = e.target.value;
        this.setState({newPassword})
    }

    handleCheckChange = (e) => {
        let checkNew = e.target.value;
        this.setState({checkNew})
    }

    // sharkeisha
    handleViewChange = (e) => {
        switch(this.state.page){
            case(1):
                console.log(this.state.username)
                var request = new XMLHttpRequest();
                request.open("GET", `http://localhost:8000/db.cfc?method=forgetPassword&username=${this.state.username}`, false);
                request.send();
                var parser = new DOMParser()
                var xml = (parser.parseFromString(request.responseText, "text/xml"))
                var ans = xml.getElementsByTagName("number");
                ans = parseInt(ans[0].textContent)
                console.log(xml)
                if (ans !== -1.0)
                {
                    this.setState({
                        questionIndex: ans,
                        page: 2,
                    });
                } else {
                    alert("Username doesn't exist!")
                }
                break;
            case(2):
                console.log("answer: " + this.state.answer)
                var request = new XMLHttpRequest();
                request.open("GET", `http://localhost:8000/db.cfc?method=checkSecurityAnswer&username=${this.state.username}&answer=${this.state.answer}`, false);
                request.send();
                var parser = new DOMParser()
                var xml = (parser.parseFromString(request.responseText, "text/xml"))
                var ans = xml.getElementsByTagName("boolean");
                ans = ans[0].attributes[0].value
                if (ans === "true")
                {
                    this.setState({
                        page: 3,
                    });
                } else {
                    alert("Answer Incorrect!")
                }
                e.preventDefault();
                break;
            case(3):
                console.log("New Password: " + this.state.newPassword)
                console.log("Check: " + this.state.checkNew)
                if (this.state.newPassword == this.state.checkNew){
                    var request = new XMLHttpRequest();
                    request.open("GET", `http://localhost:8000/db.cfc?method=updateUserPassword&username=${this.state.username}&password=${this.state.newPassword}`, false);
                    request.send();
                    this.props.history.push('/')
                } else {
                    console.log("NO")
                    e.preventDefault();
                }
                break;
        }    
    }

    // emptyAnswer
    checkAnswer = () => {
    }
    
    render() {
        let page = this.state.page;
        var inputs;
        if(page === 1){
            inputs = 
                <div>
                    <ForgotPasswordUsername 
                    inputHandler={this.handleUsernameChange}
                    viewHandler = {this.handleViewChange}
                    username = {this.state.username}
                    />
                    <Link to='/'><button id="forgot-password-login-button">Log In</button></Link>
                </div>
        }

        if(page === 2){
            inputs = <ForgotPasswordQuestion
                        question={this.state.securityQuestions[this.state.questionIndex]}
                        inputHandler={this.handleAnswerChange}
                        viewHandler = {this.handleViewChange}
                        answer={this.state.answer}
                    />
                
        }
        if(page === 3){
            inputs = <ResetPassword
                        newPass={this.state.newPassword}
                        checkPass={this.state.checkNew}
                        passHandler={this.handlePassChange}
                        checkHandler={this.handleCheckChange}
                        viewHandler = {this.handleViewChange}
                    />
        }
        return (
            <div id="forgot-password-container">
                <h1>Forgot Password</h1>
                <form>
                    {inputs}
                </form>
            </div>
        );
    }
}

export default ForgotPassword;