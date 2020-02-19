import React, {Component} from 'react';
import './App.css';
import {users} from './Users';

export default class Form extends Component {
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
            users([this.state.username, this.state.password])
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
            </div>
        )
    }
}