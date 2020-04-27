import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from 'react-router-dom';
import Cookies from 'js-cookie';

import Header from './Header';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Register from './Register';
import ClientSearch from './ClientSearch';
import ClientProfile from './ClientProfile';
import AddClient from './AddClient';
import RentCalculator from './RentCalculator';
import ViewWorksheet from './ViewWorksheet';

class App extends Component {

    render() {
      Cookies.get('User') === 'true' ? console.log("good") : console.log('bad')
      return (
        Cookies.get('User') === 'true' ? <div>
          <Header />
          <Router>
            <div>
              <Route exact path='/' component={ClientSearch} />
              <Route path='/search' component={ClientSearch} />
              <Route path='/profile/:id' component={ClientProfile} />
              <Route path='/add' component={AddClient} />
              <Route path='/rentcalc/:id' component={RentCalculator} />
              <Route path='/view/:id' component={ViewWorksheet} />
            </div>
          </Router>
        </div> : 
        <div>
          <Router>
            <div>
              <Switch>
                  <Route exact path='/' component={Login} />
                  <Route path='/forgot' component={ForgotPassword} />
                  <Route path='/register' component={Register} />
                  <Redirect to="/" />
              </Switch>
              </div>
          </Router>
        </div>
      )
    }
  }

export default App;