import React, {Component} from 'react';
//import {users} from './Users';

import {Link} from 'react-router-dom';

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
            var request = new XMLHttpRequest();
            request.open("GET", `http://localhost:8500/db.cfc?method=checkUser&username=${this.state.username}&password=${this.state.password}`, false);
            request.send();
            var parser = new DOMParser()
            var xml = (parser.parseFromString(request.responseText, "text/xml"))
            var ans = xml.getElementsByTagName("string");
            ans = ans[0].textContent
            if(ans == "YES"){
                alert("Successful")
            }
            else {
                alert('Invalid Log In');
            }
        }
        else {
            alert("Please enter a value for both fields")
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submit}>
                    <label>Username:</label>
                    <input value={this.state.username} onChange={this.nameChange} type="text" />
                    <br />
                    <label>Password:</label>
                    <input value={this.state.password} onChange={this.passwordChange} type="text" />
                    <br />
                    <input type="submit" value="Submit" />
                </form>
                <Link to='/fpass'>
                    <button>Forgot Password</button>
                </Link>
                <Link to="/register">
                    <button>Register</button>
                </Link>

            </div>
        )
    }
}