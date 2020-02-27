import React, {Component} from 'react';
import {users} from './Users';

import {Link} from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
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
        if(this.state.username !== "" && this.state.password !== ""){
            if(users([this.state.username, this.state.password])){
                //Check db so see if username and password pass
                //vV Change this.state.loggedIn on App to true Vv
                this.props.handler();
            }else{
                alert('Invalid Log In');
            }

        }
        else {
            console.log("ERROR")
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