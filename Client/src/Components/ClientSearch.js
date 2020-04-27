import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReactLoading from 'react-loading';
// react-loading  https://www.npmjs.com/package/react-loading

import '../Styles/ClientSearch.css'

class ClientSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: null,
            search: "",
            clients: [],
            loadingData: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    loadInfo = (e) => {
        this.setState({
            clients: [],        
            loadingData: true});
        e.preventDefault()
        axios.get(`http://localhost:8500/db.cfc?method=getCSearchRegex&clientName=${this.state.search}`)
            .then(res => this.createClients(res.data.DATA))
    }

    createClients = (clientList) => {
        let clients = [];
        clientList.forEach(clientData => {
            let DOB = clientData[2];
            let date = new Date(DOB);
            DOB = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
            clients.push([`${clientData[0]} ${clientData[1]}`, DOB, clientData[3]])
        })
        this.setState({
                clients: clients,
                loadingData: false});
    }
    // change the state after the request?

    handleChange(event) {
        this.setState({search: event.target.value});
    }

    check(id){
        this.props.history.push(`/profile/${id}`)
    }
    
    render() {

        let tableTitle;
        let tableHead;
        let loadingView;

        if(this.state.loadingData){
            loadingView = <ReactLoading id="client-search-loading" type={'spin'} color={'turquoise'} height={100} width={100}/>
        }

        if(this.state.clients.length){
            tableTitle = <h3 className="font-weight-light"> Results </h3>
            tableHead = <tr>
                            <th>Name</th>
                            <th>DOB</th>
                        </tr>
        }

        return (
            <div id="client-search-container">
                <div id="client-search-content">
                    <h1>Client Search</h1>
                    <Link to='/add'><button className="btn text-white" id="client-search-add-client">Add Client</button></Link>

                    
                    <label className="font-weight-light" >Client Name</label>
                    
                    <input
                        className="rounded pl-2"
                        type='text'
                        value={this.state.search}
                        onChange={this.handleChange}
                    >
                    </input>
                    <button className="btn text-white mt-5" id="client-search-button" onClick={this.loadInfo}>Search</button>
                    {tableTitle}
                    {loadingView}
                    <table id="client-search-results">
                        <thead>
                            {tableHead}
                        </thead>
                        <tbody>
                            {this.state.clients.length > 0 ? this.state.clients.map(client => {
                                return(
                                    <tr onClick={this.check.bind(this, client[2])} key={client[2]}>
                                        <td>{client[0]}</td>
                                        <td>{client[1]}</td>
                                    </tr>
                                )}) : console.log("NO USERS FOUND")
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ClientSearch;