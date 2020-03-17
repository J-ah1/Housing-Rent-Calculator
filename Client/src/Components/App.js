import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Register from './Register';
import ClientSearch from './ClientSearch';
import ClientProfile from './ClientProfile';
import RentCalculator0 from './RentCalculator0'

class App extends Component {
    render() {
      return (
        <Router>
          <div>
            <Route exact path='/' component={Login} />
            <Route path='/forgot' component={ForgotPassword} />
            <Route path='/register' component={Register} />
            <Route path='/search' component={ClientSearch} />
            <Route path='/profile/:id' component={ClientProfile} />
            <Route path='/rc0' component={RentCalculator0} />
          </div>
        </Router>
      )
    }
  }

export default App;


/*
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: true
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
        return (
            <div>
              {//this.state.loggedIn ? <ClientContainer /> : <LoginContainer loginHandler={this.handleLogin}/>
              }
              {<TestContainer />}
            </div>
        );
    }
}

export default App;*/
