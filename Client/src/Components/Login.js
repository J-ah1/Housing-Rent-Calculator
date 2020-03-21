import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import '../Styles/Login.css';

export default class Login extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
        }
    }

    nameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    passwordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    submit = (e) => {
        e.preventDefault()

        // password == userPassword
        if(this.state.username !== "" && this.state.password !== ""){
            axios.get(`http://localhost:8500/db.cfc?method=checkUser&username=${this.state.username}&password=${this.state.password}`)
                .then(res => {
                    if(res.data === "YES"){
                        console.log("Success")
                        this.props.history.push({
                            pathname: '/search',
                        })
                    }
                    else {
                        alert('Invalid Log In');
                    }
                })
        }
        else {
            alert("Please enter a value for both fields")
        }
    }

    render() {
        return (
            <div id="login-container">
                    <h1>Housing Rent Calcuator</h1>
                    <div id="login-content">
                        <form id="login-form" onSubmit={this.submit}>
                            <label>Username</label>
                            <br/>
                            <input className="login-form-input" value={this.state.username} onChange={this.nameChange} type="text" />
                            <br/>
                            <label>Password</label>
                            <br/>
                            <input className="login-form-input"  value={this.state.password} onChange={this.passwordChange} type="password" />
                            <br/>
                            <input id="login-form-submit" type="submit" value="Log In" />
                        </form>

                        <Link id="login-link-forgot-pass" to='/forgot'>
                            <p>Forgot Password?</p>
                        </Link>
                        <Link to="/register">
                            <button id="login-link-register">Register</button>
                        </Link>
                    </div>
            </div>
        )
    }
}