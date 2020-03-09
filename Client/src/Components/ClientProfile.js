import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'; 

import ClientIntake from './ClientIntake';
import Worksheet from './Worksheet';

//import '../Styles/ClientProfile.css'

class ClientProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ID: -1,
            FNAME: '',
            LNAME:'',
            ADDSTREET:'',
            ADDCITY:'',
            ADDZIP:'',
            GENDER:'',
            DOB:'',
            view: ''
        }
        this.handleGetClientInformation = this.handleGetClientInformation.bind(this);
        this.handleSettingState = this.handleSettingState.bind(this);
    }

    componentDidMount(){
        this.handleGetClientInformation(parseInt(this.props.match.params.id))
    }

    handleGetClientInformation(ID){
        var request = new XMLHttpRequest();
        request.open("GET", `http://localhost:8000/db.cfc?method=getClientInfo&clientID=${ID}`, false);
        request.send()
        var parser = new DOMParser();
        var xml = (parser.parseFromString(request.response, "text/xml"))      
        this.handleSettingState(xml);
        this.handleView()
    }

    handleSettingState = (xml) => {
        let root = xml.getElementsByTagName('field');
        for(let i = 0; i < root.length; i++){
            let nameOfState = root[i].attributes[0].value;
            let dataOfState = root[i].textContent
            console.log(`${[nameOfState]}: ${dataOfState}`)
            this.setState({
                [nameOfState]: dataOfState
            })
        }
    }

    handleView = (e) => {
        let view;
        switch(e){
            case('intake'):
                view = <ClientIntake 
                name={this.state.FNAME + ' ' + this.state.LNAME}
                dob={this.state.DOB}
                gender={this.state.GENDER}
                address={this.state.ADDSTREET + ' ' + this.state.ADDCITY + ' ' + this.state.ADDZIP}
                />
                break;
            case('rent'):
                view = <Worksheet id={this.state.ID}/>
                break;
            default:
                view = <h1>Welcome</h1>
                break;
        }
        this.setState({
            view: view 
        })
    }

    render() {
        return (
            <div>
                <nav>
                    <ul>
                        <li>
                            <button onClick={() => this.handleView('intake')}>Intake Page</button>
                        </li>
                        <li>
                            <button onClick={() => this.handleView('rent')}>Rent Worksheets</button>
                        </li>
                    </ul>
                </nav>
                {this.state.view}
            </div>
        );
    }
}

export default ClientProfile;