import React, { Component } from 'react';
import {Link} from 'react-router-dom';

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
        e.preventDefault();
        var request = new XMLHttpRequest();
        request.open("GET", `http://localhost:8500/db.cfc?method=getCSearchRegex&clientName=${this.state.search}`, false);
        request.send();
        var parser = new DOMParser()
        var xml = (parser.parseFromString(request.responseText, "text/xml"))
        this.createClients(xml);
    }

    createClients = (xml) => {
        let root = xml.getElementsByTagName('field');
        let clients = []
        for(let i = 0; i < root.length; i += 4){
            let fName = root[i].textContent;
            let lName = root[i+1].textContent;
            let DOB = root[i+2].textContent;
            let date = new Date(DOB);
            DOB = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
            let id = root[i+3].textContent;
            clients.push([fName + " " + lName, DOB, id]);
        }
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
                    <button id="client-search-add-client">Add New Client</button>
                    
                    <label>Client Name</label>
                    
                    <input
                        type='text'
                        value={this.state.search}
                        onChange={this.handleChange}
                    >
                    </input>
                    <button id="client-search-button" onClick={this.loadInfo}>Search</button>
                    <table>
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
                                        <td></td>
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