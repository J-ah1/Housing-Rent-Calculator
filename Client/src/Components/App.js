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
import NotFound from './404';

class App extends Component {

    render() {
      return (
        Cookies.get('User') === 'true' ? <div>
          <Header />
          <Router>
            <div>
              <Switch>
                <Route exact path='/' component={ClientSearch} />
                <Route path='/search' component={ClientSearch} />
                <Route path='/profile/:id' component={ClientProfile} />
                <Route path='/add' component={AddClient} />
                <Route path='/rentcalc/:id' component={RentCalculator} />
                <Route path='/view/:id' component={ViewWorksheet} />
                <Route path="/404" component={NotFound} />
                <Redirect to="/404" />
              </Switch>
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