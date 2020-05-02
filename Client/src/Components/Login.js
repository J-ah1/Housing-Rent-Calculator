import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import ReactLoading from 'react-loading';

import '../Styles/Login.css';

export default class Login extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            isLoading: false
        }
    }

    componentDidMount = () => {
        axios.get(`http://localhost:8000/db.cfc?method=checkUserAuth`, {withCredentials: true})
            .then(res => console.log(res))
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
            this.set({isLoading: true});
            axios.get(`http://localhost:8000/db.cfc?method=checkUser&username=${this.state.username}&password=${this.state.password}`, {withCredentials: true})
                .then(res => {
                    console.log(res.data.BOOL)
                    console.log(res.data)
                    if(res.data.BOOL){
                        //console.log("Success")
                        console.log(res.data.UID)
                        Cookies.set("userID", res.data.UID)
                        window.location.reload()
                        /*this.props.history.push({
                            pathname: '/search',
                        })*/
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

        let loading;
        let loginRoutes;

        if(this.state.isLoading){
            loading = <ReactLoading id="client-search-loading" type={'spin'} color={'turquoise'} height={100} width={100}/>
        }else{
            loginRoutes = <div>
                            <Link id="login-link-forgot-pass" to='/forgot'>
                                <p className="pl-3">Forgot Password?</p>
                            </Link>
                            <Link to="/register">
                                <button className="btn border" id="login-link-register">Register</button>
                            </Link>
                         </div>
        }


        return (
            <div id="login-container">
                    <h1>Housing Rent Calcuator</h1>
                    <div id="login-content">
                        <form id="login-form" onSubmit={this.submit}>
                            <label className="font-weight-light">Username</label>
                           
                            <input className="login-form-input rounded mb-4" value={this.state.username} onChange={this.nameChange} type="text" />
                            
                            <label className="font-weight-light" >Password</label>
                            
                            <input className="login-form-input rounded mb-4"  value={this.state.password} onChange={this.passwordChange} type="password" />
                            
                            <input className="btn border" id="login-form-submit" type="submit" value="Log In" />
                        </form>

                        {loading}
                        {loginRoutes}
                    </div>
            </div>
        )
    }
}