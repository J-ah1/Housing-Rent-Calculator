import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'; 

import ClientIntake from './ClientIntake';

import '../Styles/ClientProfile.css'

class ClientProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ID:'',
            FNAME: '',
            LNAME:'',
            ADDSTREET:'',
            ADDCITY:'',
            ADDZIP:'',
            GENDER:'',
            DOB:''  
        }
        this.handleGetClientInformation = this.handleGetClientInformation.bind(this);
        this.handleSettingState = this.handleSettingState.bind(this);
    }

    componentDidMount(){
        this.handleGetClientInformation(this.props.clientID)
    }

    handleGetClientInformation(ID){
        var request = new XMLHttpRequest();
        request.open("GET", `http://localhost:8500/db.cfc?method=getClientInfo&clientID=${ID}`, false);
        request.send()
        var parser = new DOMParser();
        var xml = (parser.parseFromString(request.response, "text/xml"))      
        this.handleSettingState(xml);
    }

    handleSettingState = (xml) => {
        let root = xml.getElementsByTagName('field');
        for(let i = 0; i < root.length; i++){
            let nameOfState = root[i].attributes[0].value;
            let dataOfState = root[i].textContent
            this.setState({
                [nameOfState]: dataOfState
            })
        }
    }

    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'><button>Intake Page</button></Link>
                            </li>
                            <li>
                                <Link to='/rentWorksheets'><button>Rent Worksheets</button></Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <Switch>
                    <Route path='/rentWorksheets'>
                        Rent Worksheet
                    </Route>
                    <Route exact path='/'>
                        <ClientIntake 
                            name={this.state.FNAME + ' ' + this.state.LNAME}
                            dob={this.state.DOB}
                            gender={this.state.GENDER}
                            address={this.state.ADDSTREET + ' ' + this.state.ADDCITY + ' ' + this.state.ADDZIP}
                        />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default ClientProfile;