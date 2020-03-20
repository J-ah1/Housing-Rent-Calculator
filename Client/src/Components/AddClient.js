import React, { Component } from 'react'

function yearOptions() {
    let year = 1940;
    let years = [];

    while(year <= 2020){
        years.push(<option value={year}>{year}</option>)
        year++
    }

    return years;
}

function dayOptions() {
    let day = 1;
    let days = [];

    while(day <= 31){
        days.push(<option value={day}>{day}</option>)
        day++
    }

    return days;
}

class AddClient extends Component {  constructor(props) {
    super(props)
    this.state = {
        fName: "",
        lName: "",
        addStreet:"",
        addCity:"",
        addState:"",
        addZip:"",
        gender:"1",
        year:"",
        month:"",
        day:""
    }
}

changeHandler = (e) =>{
    this.setState({
        [e.target.name]:e.target.value
    })
}
submit = (e) => {
    
    e.preventDefault();
    if(this.state.fName !== "" && this.state.lName !== "" && this.state.addCity !=="" && this.state.addState !==""
    && this.state.addStreet !=="" && this.state.addZip !=="" && this.state.day !=="" && this.state.year !==""
    && this.state.month !=="" && this.state.gender !==""){
        console.log(this.state)
        /*console.log(this.state)
        var request = new XMLHttpRequest();
        request.open("GET", `http://localhost:8000/db.cfc?method=addClient&fName=${this.state.fName}&lName=${this.state.lName}&addStreet=${this.state.addStreet}&addCity=${this.state.addCity}&addState=${this.state.addState}&addZip=${this.state.addZip}&gender=${this.state.gender}&dob=${isoDate}`, false);
        request.send();*/
        //this.props.history.push('/')
    }
    else {
        alert("Missing information")
    }
}
render() {
    return (
        <div align="center">
                <h1>Client Add Page </h1>
                <form onSubmit={this.submit} >
            <table  width="35%"  align="center"  cellSpacing="20%" cellPadding="10%">
               
                <tbody>
                 
                       <tr>
                            <td colSpan="3">
                                <h5>Client's Name</h5>
                            </td>
                        </tr>
                        <tr>
                             <th colSpan="3">First Name</th>
                        </tr>
                        <tr>    
                             <td colSpan="3"> 
                                <input type="text" className="form-control" name="fName"  onChange={this.changeHandler}  placeholder="Client's First Name" required />
                            </td>
                        </tr>
                        <tr>
                             <th colSpan="3">
                                <label htmlFor="name">Last Name</label>
                            </th>
                        </tr>
                        <tr>
                             <td colSpan="3">
                                <input type="text" className="addwith" name="lName" onChange={this.changeHandler} placeholder="Client's Last Name" required />
                            </td>
                        </tr>
                        <tr>
                            <th colSpan="3">
                               
                                Client's Gender
                            </th>
                        </tr>
                        <tr>
                             <td colSpan="3">        
                                <select  className="addwith" name="gender"  onChange={this.changeHandler} required>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="other">Prefer not to disclose</option>
                                </select>
                               
                            </td>
                        </tr>
                        <tr>    
                             <th colSpan="3">
                                <h5>Client's Date of Birth</h5>
                            </th>
                        </tr>
                        
                        <tr>
                                <td>
                                     <select  name="month" onChange={this.changeHandler} required>
                                    <option value="">Month</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                                </td>       
                                <td>
                                
                                <select name="day" onChange={this.changeHandler}>
                                    <option value="">Day</option>
                                    {dayOptions()}
                                    
                                </select>
                            
                                </td>
                                <td>
                                    <select  name="year" onChange={this.changeHandler}>
                                        <option value="">Year</option>
                                        {yearOptions()}
                                    </select>
                                </td>
                        </tr>
                        
                        <tr>
                             <td colSpan="3">
                                <h5>Client's Current Address</h5>
                            </td>
                        </tr> 
                        <tr>   
                             <th colSpan="3">
                                <label htmlFor="ccyear">Street</label>
                            </th>
                        </tr>
                        <tr>
                             <td colSpan="3">
                                <input type="text" placeholder="Add Street"  className="addwith" name="addStreet"  onChange={this.changeHandler}>
                                </input>
                            </td>
                        </tr>
                        <tr>
                             <th colSpan="3">
                              <label htmlFor="ccyear">City</label>
                            </th>
                        </tr>
                        
                        <tr>   
                                
                             <td colSpan="3">
                               
                                <input type="text" placeholder="Add City" className="addwith" name="addCity"  onChange={this.changeHandler}>
                                
                                </input>
                               
                            </td>
                        </tr>
                        <tr>
                             <th colSpan="3">
                            <label htmlFor="ccyear">State</label>
                            </th>    
                        </tr> 
                        <tr>   
                             <td colSpan="3">
                               
                                
                                <input type="text" placeholder="Add State" className="addwith" name="addState"  onChange={this.changeHandler}>
                                
                                </input>
                               
                            </td>
                        </tr>
                        <tr>
                             <th colSpan="3">
                            <label htmlFor="ccyear">Zip</label>
                            </th>       
                        </tr>
                        <tr>    
                             <td colSpan="3">
                               
                               
                                <input type="text" placeholder="Add Zip" className="addwith" name="addZip"  onChange={this.changeHandler}>
                                
                                </input>
                               
                            </td>
                        </tr>
                        <tr>
                            <td >
                                <button type="submit"  size="md"  color="success"> Submit</button>
                            </td>
                        </tr>
                    
                    
                </tbody>
              
            </table>
            </form>
        </div>
    )
}
}

export default AddClient