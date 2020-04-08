import React, { Component } from 'react'
import axios from 'axios';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import '../Styles/AddClient.css'

class AddClient extends Component {  
    constructor(props) {
        super(props)
        this.state = {
            fName: "",
            lName: "",
            addStreet:"",
            addCity:"",
            addState:"",
            addZip:"",
            gender:"",
            dob: new Date(),
            addressFlag: false
        }
    }

    // Change Handlers
    changeHandler = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    radioChangeHandler = (e) => {
        const gender = e.target.value;
        this.setState({gender});
    }

    hangleDateChange = (date) => {
        const dob = date;
        this.setState({dob});
    }

    // Event Listener for Form Submission 
    handleSubmit = (e) =>{
        e.preventDefault();
        this.requestPrep();
    }

    // async function to wait while checking addressFlag 
    async requestPrep(){
        await this.handleAddressFlag();
        this.sendRequests();
    }

    handleAddressFlag(){
        if(this.state.addStreet !== "" && this.state.addCity !== "" && this.state.addState !== "" && this.state.addZip !== ""){
            this.setState({addressFlag: true});
        }
    }

    sendRequests(){
        const fName = this.state.fName;
        const lName = this.state.lName;
        const addStreet = this.state.addStreet;
        const addCity = this.state.addCity;
        const addState = this.state.addState;
        const addZip = this.state.addZip;
        const gender = this.state.gender;
        const dob = this.state.dob;
        const formattedDate = dob.getFullYear() + '-' + (dob.getMonth() + 1) + '-' + dob.getDate();
        console.log(formattedDate);

        if(this.state.addressFlag){
            axios.get(`http://localhost:8500/db.cfc?method=addClient&fName=${fName}&lName=${lName}&addStreet=${addStreet}&addCity=${addCity}&addState=${addState}&addZip=${addZip}&gender=${gender}&dob=${formattedDate}`)
            .then(response => {
                this.navigatetoClientProfile(response.data);
            })
            .catch(error => {
                console.log(error.response);
                alert('Something went wrong');
                this.props.history.push('/search');
            });
        }else{
            axios.get(`http://localhost:8500/db.cfc?method=addClient&fName=${fName}&lName=${lName}&gender=${gender}&dob=${dob}`) 
                .then(response => {
                    this.navigatetoClientProfile(response.data);
                }) 
                .catch(error => {
                    console.log(error.response);
                    alert('Something went wrong');
                    this.props.history.push('/search');
                });
        } 
    }

    
    navigatetoClientProfile(clientID){
        this.props.history.push(`/profile/${clientID}`);
    }

    

    render() {
        return (
            <div className="mt-3" style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
                <h1>Add Client</h1>

               

                <form 
                    id="add-client-form"
                    className="card mt-3 mb-5"
                    onSubmit={this.handleSubmit}
                    style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '75%', padding:'1em'}}
                >
                    <label className="font-weight-light">First Name: </label>
                    <input 
                        className="rounded"
                        type="text"
                        name="fName"
                        value={this.state.fName}
                        onChange={this.changeHandler}
                        required
                        style={{width: '25%'}}>
                    </input>
                    
                    <label className="font-weight-light mt-2">Last Name: </label>
                    <input 
                        className="rounded"
                        type="text"
                        name="lName"
                        value={this.state.lName}
                        onChange={this.changeHandler}
                        required
                        style={{width: '25%'}}>
                    </input>
                  

                    <label className="font-weight-light mt-3">Address:</label>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        <input 
                            className="rounded mr-2"
                            placeholder="Street Address"
                            type="text"
                            name="addStreet"
                            value={this.state.addStreet}
                            onChange={this.changeHandler}
                        ></input>
                        <input 
                            className="rounded mr-2"
                            placeholder="City"
                            type="text"
                            name="addCity"
                            value={this.state.addCity}
                            onChange={this.changeHandler}
                        ></input>
                        <input 
                            className="rounded mr-2"
                            placeholder="State"
                            type="text"
                            name="addState"
                            value={this.state.addState}
                            onChange={this.changeHandler}
                        ></input>
                        <input 
                            className="rounded mr-2"
                            placeholder="Postal/Zip Code"
                            type="text"
                            name="addZip"
                            value={this.state.addZip}
                            onChange={this.changeHandler}
                        ></input>
                    </div>

                    <label className="font-weight-light mt-3">Gender: </label>
                    <div className="ml-4" style={{display: 'flex', flexDirection: 'column'}}>
                        <div>
                            <input
                                className="mr-2"
                                type="radio"
                                id="male"
                                name="gender"
                                value="1"
                                onChange={this.radioChangeHandler}
                                required
                            >
                            </input>
                            <label className="font-weight-light">Male</label>
                        </div>
                        <div>
                            <input
                                className="mr-2"
                                type="radio"
                                id="female"
                                name="gender"
                                value="2"
                                onChange={this.radioChangeHandler}
                            >
                            </input> 
                            <label className="font-weight-light">Female</label>
                        </div>
                        <div>
                            <input
                                className="mr-2"
                                type="radio"
                                id="other"
                                name="gender"
                                value="3"
                                onChange={this.radioChangeHandler}
                            >
                            </input>  
                            <label className="font-weight-light">Other</label>
                        </div>  
                    </div> 

                    <div>
                        <label className="font-weight-light mr-2">Date of Birth: </label>
                        <DatePicker
                            selected={this.state.dob}
                            onChange={this.hangleDateChange}
                        />
                     
                    </div>

                    <button className="btn text-white" type="submit">Submit</button>
                </form>
            </div>

        )
    }
}

export default AddClient