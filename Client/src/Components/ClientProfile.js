import React, { Component } from 'react';
import axios from 'axios';
import ClientIntake from './ClientIntake';
import Worksheet from './Worksheet';

// import '../Styles/ClientProfile.css'


class ClientProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ID: -1,
            FNAME: 'loading',
            LNAME:'loading',
            ADDSTREET:'loading',
            ADDCITY:'loading',
            ADDSTATE: 'loading',
            ADDZIP:'loading',
            GENDER:'loading',
            DOB:'loading',
            view: 'intake',
            worksheets: []
        }
    }

    componentDidMount(){
        this.handleGetClientInformation(parseInt(this.props.match.params.id));     
    }

    handleGetClientInformation(ID){
        // Get Client Basic Client Information => Set State
        axios.get(`http://localhost:8000/db.cfc?method=clientProfile&clientID=${ID}`)
                .then(res => {
                    this.handleSettingClientInfoState(res.data.DATA[0])
                })

        // Get Client Worksheets => Set State 
        axios.get(`http://localhost:8000/db.cfc?method=clientWorksheetProfile&clientID=${ID}`)
                .then(res => this.handleSettingWorksheetState(res.data.DATA));
    }

    handleSettingClientInfoState = (clientData) => {
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
        });
    }

    handleSettingWorksheetState = (worksheets) => {
        let sheets = [];
        console.log(worksheets)
        worksheets.forEach(worksheet => {
            let date = new Date(worksheet[0]);
            date = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
            sheets.push({Date: date, Calculation: worksheet[1]})
        })
        this.setState({
            worksheets: sheets
        })
    }


    navigateToRentCalculator = () => {
        this.props.history.push(`/rentcalc/${this.state.ID}`);
    }

    render() {
        let currentView = this.state.view;
        let view;
        switch(currentView){
            case('worksheet'):
                view = <Worksheet worksheets={this.state.worksheets} id={this.state.ID} 
                toNewWorksheet={this.navigateToRentCalculator}
                />
                break;
            case('intake'):
            default:
                view = <ClientIntake 
                name={this.state.FNAME + ' ' + this.state.LNAME}
                dob={this.state.DOB}
                gender={this.state.GENDER}
                address={this.state.ADDSTREET + ' ' + this.state.ADDCITY + ' ' + this.state.ADDZIP}
                />
                break;
        }

        return (
            <div>
                <nav>
                    <ul>
                        <li>
                            <button onClick={() => this.setState({view:'intake'})}>Intake Page</button>
                        </li>
                        <li>
                            <button onClick={() => this.setState({view:'worksheet'})}>Rent Worksheets</button>
                        </li>
                    </ul>
                </nav>
                {view}
            </div>
        );
    }
}

export default ClientProfile;