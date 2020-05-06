import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

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

  constructor(props) {
    super(props)
    this.state = {
        user: false
    }
}

    // login & signout & register
    componentDidMount = async() => {
      let user = null
      await axios.get(`http://localhost:8000/db.cfc?method=checkUserAuth`, {withCredentials: true})
      .then(res => {
        console.log(res)
        this.setState({user: res.data})
      })
    }

    render() {
      return (
        Cookies.get('userID') !== undefined && this.state.user ? <div>
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