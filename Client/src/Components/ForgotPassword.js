import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

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
            case(2):
                console.log("answer: " + this.state.answer)
                axios.get(`http://localhost:8500/db.cfc?method=checkSecurityAnswer&username=${this.state.username}&answer=${this.state.answer}`)
                .then(res => {
                    if(res.data){
                        this.setState({
                            page: 3,
                        });
                    } else {
                        alert("Answer Incorrect!")
                    }
                })
                e.preventDefault();
                break;
            case(3):
                console.log("New Password: " + this.state.newPassword)
                console.log("Check: " + this.state.checkNew)
                if (this.state.newPassword === this.state.checkNew){
                    axios.get(`http://localhost:8500/db.cfc?method=updateUserPassword&username=${this.state.username}&password=${this.state.newPassword}`)
                    .then()
                    this.props.history.push('/')
                } else {
                    console.log("NO")
                    e.preventDefault();
                }
                break;
            default:
                e.preventDefault();
                console.log(this.state.username)
                axios.get(`http://localhost:8500/db.cfc?method=forgetPassword&username=${this.state.username}`)
                .then(res => {
                    if(res.data !== -1){
                        this.setState({
                            questionIndex: res.data,
                            page: 2,
                        });
                    } else {
                        alert("Username doesn't exist!")
                    }
                })
                break;
        }    
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
                    
                    <Link to='/'><button className="btn text-white" id="forgot-password-login-button">Log In</button></Link>
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