import React, { Component } from 'react';
import axios from 'axios';
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
            ADDSTATE: '',
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
        axios.get(`http://localhost:8500/db.cfc?method=clientProfile&clientID=${ID}`)
                .then(res => {
                    console.log(res.data)
                    this.handleSettingState(res.data.DATA[0])
                })
    }

    handleSettingState = (clientData) => {
        console.log(clientData)
        this.setState({
            ID: clientData[0],
            FNAME: clientData[1],
            LNAME: clientData[2],
            ADDSTREET: clientData[3],
            ADDCITY: clientData[4],
            ADDSTATE: clientData[5],
            ADDZIP: clientData[6],
            GENDER: clientData[7],
            DOB: clientData[8]
        })
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