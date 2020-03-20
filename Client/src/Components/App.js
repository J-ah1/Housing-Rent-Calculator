import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

//import Header from './Header';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Register from './Register';
import ClientSearch from './ClientSearch';
import ClientProfile from './ClientProfile';
import AddClient from './AddClient';
import RentCalculator from './RentCalculator';

class App extends Component {
    render() {
      return (
        <div>
          {/*<Header /> Example of how we could implement a Header. Remove the comments to see it*/}
          <Router>
            <div>
              <Route exact path='/' component={Login} />
              <Route path='/forgot' component={ForgotPassword} />
              <Route path='/register' component={Register} />
              <Route path='/search' component={ClientSearch} />
              <Route path='/profile/:id' component={ClientProfile} />
              <Route path='/add' component={AddClient} />
              <Route path='/rentcalc' component={RentCalculator} />
            </div>
          </Router>
        </div>
      )
    }
  }

export default App;