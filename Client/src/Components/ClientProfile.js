import React, { Component } from 'react';
import axios from 'axios';
import ClientIntake from './ClientIntake';
import Worksheet from './Worksheet';

import '../Styles/ClientProfile.css'


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
            view: '',
            worksheets: [],
            loadingClientInfo: false,
            loadingClientWorksheets: false
        }
    }

    componentDidMount(){
        this.handleGetClientInformation(parseInt(this.props.match.params.id));     
    }

    handleGetClientInformation = async(ID) => {
        // Get Client Basic Client Information => Set State

        this.setState({
                loadingClientInfo: true,
                loadingClientWorksheets: true  
                })

        axios.get(`http://localhost:8000/db.cfc?method=clientProfile&clientID=${ID}`)
                .then(res => {
                    console.log(res)
                    this.handleSettingClientInfoState(res.data.DATA[0])
                    console.log(res)
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
            DOB: clientData[8],
            loadingClientInfo: false
        });
    }

    handleSettingWorksheetState = (worksheets) => {
        let sheets = [];
        console.log(worksheets)
        worksheets.forEach(worksheet => {
            let date = new Date(worksheet[1]);
            date = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
            sheets.push({ID: worksheet[0], Date: date, Calculation: worksheet[2]})
        })
        this.setState({
            worksheets: sheets,
            loadingClientWorksheets: false
        })
    }


    navigateToRentCalculator = () => {
         this.props.history.push(`/rentcalc/${this.state.ID}`);
    }

    navigateToView = (event) => {
        this.props.history.push(`/view/${event.target.id}`);
   }

   printWorksheet = async event => {
        const loadOtherPage = await this.props.history.push(`/view/${event.target.id}/print`);       
   }

   backToSearch = (event) => {
        this.props.history.push('/search');
   }
   


   handleProfileNavigation = (e) => {
       
       const view = e.target.id;

       if(view === 'intake'){
            document.querySelector('#intake').classList.add('text-white')
            document.querySelector('#worksheet').classList.remove('text-white')
            this.setState({view});
       }

       if(view === 'worksheet'){
            document.querySelector('#worksheet').classList.add('text-white');
            document.querySelector('#intake').classList.remove('text-white');
            this.setState({view})
       }



   }


    render() {

        let currentView = this.state.view;
        let view;
        switch(currentView){
            case('worksheet'):
                view = <Worksheet 
                            worksheets={this.state.worksheets} 
                            id={this.state.ID} 
                            toNewWorksheet={this.navigateToRentCalculator} 
                            toView={this.navigateToView}
                            print={this.printWorksheet}
                            isLoading={this.state.loadingClientWorksheets}
                            searchHandler = {this.backToSearch}
                        />
                break;
            case('intake'):
            default:
                view = <ClientIntake 
                            name={this.state.FNAME + ' ' + this.state.LNAME}
                            dob={this.state.DOB}
                            gender={this.state.GENDER}
                            address={this.state.ADDSTREET + ' ' + this.state.ADDCITY + ' ' + this.state.ADDZIP}
                            isLoading={this.state.loadingClientInfo}
                            searchHandler = {this.backToSearch}
                        />
                break;
        }

        return (
            <div>
                <nav>
                    <ul id="client-intake-nav-buttons">
                        <li>
                            <button className="btn text-white" id="intake" onClick={this.handleProfileNavigation}>Intake Page</button>
                        </li>
                        <li>
                            <button className="btn" id="worksheet" onClick={this.handleProfileNavigation}>Rent Worksheets</button>
                        </li>
                    </ul>
                </nav>
                {view}
            </div>
        );
    }
}

export default ClientProfile;
