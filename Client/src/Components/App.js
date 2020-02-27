import React, { Component } from 'react';

import LoginContainer from './LoginContainer';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
        this.handleLogin = this.handleLogin.bind(this);
    }
    

    handleLogin = () =>{
        // this.setState({
        //     loggedIn : true
        // })
        console.log('test fire');
    }

    render() {

        const loggedIn = this.state.loggedIn;
        var view;

        if(!loggedIn){
            view = <LoginContainer loginHandler={this.handleLogin}/>
        }else{
            //render app
            view = "test";
        }

        return (
            <div>
              {view}  
            </div>
        );
    }
}

export default App;