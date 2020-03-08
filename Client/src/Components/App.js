import React, { Component } from 'react';

import LoginContainer from './LoginContainer';
import ClientProfile from './ClientProfile';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
        this.handleLogin = this.handleLogin.bind(this);

    }
    
    handleLogin = () =>{
        if(this.state.loggedIn){
            this.setState({
                loggedIn: false
            })
        }else{
            this.setState({
                loggedIn: true
            })
        }
    }

    render() {

        const loggedIn = this.state.loggedIn;
        var view;

        if(!loggedIn){
            view = <LoginContainer loginHandler={this.handleLogin}/>
        }else{
            view = 
                <div>
                    <button onClick={this.handleLogin}>Logout</button>
                    <ClientProfile
                        clientID={1}
                    />
                    {/* ^^^ Replace with Client Search ^^^ */}
                    {/* Client Search needs to pass Client Profile a prop of ID */}
                </div>
        }

        return (
            <div>
              {view}  
            </div>
        );
    }
}

export default App;