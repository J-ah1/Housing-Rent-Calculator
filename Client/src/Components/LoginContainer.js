import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Register from './Register';

function LoginContainer(props) {
    return (
       <Router>
            <Switch>  
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path='/fpass'>
                    <ForgotPassword/>
                </Route>
                <Route exact path='/'>
                    <Login handler={props.loginHandler}/>
                </Route>
            </Switch>
        </Router>
    );
}

export default LoginContainer;