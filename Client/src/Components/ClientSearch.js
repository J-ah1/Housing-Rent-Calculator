import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import '../Styles/ClientSearch.css'

class ClientSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: null,
            search: "",
            clients: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    loadInfo = (e) => {
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
        this.setState({clients: clients})
    }

    handleChange(event) {
        this.setState({search: event.target.value});
    }

    check(id){
        this.props.history.push(`/profile/${id}`)
    }
    
    render() {
        return (
            <div id="client-search-container">
                <div id="client-search-content">
                    <h1>Client Search</h1>
                    <Link to='/add'><button id="client-search-add-client">Add Client</button></Link>

                    
                    <label>Client Name</label>
                    
                    <input
                        type='text'
                        value={this.state.search}
                        onChange={this.handleChange}
                    >
                    </input>
                    <button id="client-search-button" onClick={this.loadInfo}>Search</button>
                    <table id="client-search-results">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>DOB</th>
                            </tr>
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