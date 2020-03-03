import React, {Component} from 'react';


class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            errorMessage: ""
        }  
    }
  
    nameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }  // function is used for fill the default states

    fNameChange = (e) => {
        this.setState({
            fName: e.target.value
        })
    } // function is used for fill the default states

    lNameChange = (e) => {
        this.setState({
            lName: e.target.value
        })
    }// function is used for fill the default states

    pswdChange = (e) => {
        this.setState({
            pswd: e.target.value
        })
    }// function is used for fill the default states

    cpswdChange = (e) => {
        this.setState({
            cpswd: e.target.value
        })
    }// function is used for fill the default states

    emailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }// function is used for fill the default states

    phoneChange = (e) => {
        this.setState({
            phone: e.target.value
        })
    }// function is used for fill the default states

    submit = (e) => {
        e.preventDefault();
        //if condition is check the field is empty or not
        if(this.state.username !== "" && this.state.pswd !== "" && this.state.fName !== "" &&
        this.state.phone !== "" && this.state.email !== "" && this.state.cpswd !=="" && this.state.lName !=="" ){
            var request = new XMLHttpRequest();//create object for ajax calling 
            request.open("POST", "http://localhost:8500/rentcalculator/index.cfm/register",false);//set ajax call url 
            request.setRequestHeader("Content-Type", "application/json");//set header 
            request.send(JSON.stringify({"username":this.state.username,"fName":this.state.fName,"phone":this.state.phone,
            "email":this.state.email,"cpswd":this.state.cpswd,"pswd":this.state.pswd,"lName":this.state.lName}));//set body with json type
            const resposedata=JSON.parse(request.responseText);// request.responseText response which gives ajax calling 
            if(resposedata.status===true){
                alert("login:  "+resposedata.message);
                this.setState({errorMessage:""})
                this.props.handler();//this function handle the login 
                
            }else{
                
                this.setState({errorMessage:resposedata.message})//set the errorMessage when ajax response error
            }
            
        }
        else {
            this.setState({errorMessage: "All Field  Cannot be Empty"})// when field are empty
           
        }
       
    }
    render() {
        return (
            <div id="mydiv">
                <h1>Create Your Profile</h1>
                <div className={ this.state.errorMessage?"alert":"" }>
                { 
                    this.state.errorMessage &&
                     this.state.errorMessage 
                }
                </div>
                 <form onSubmit={this.submit}>
                    <table align="center">
                        <tbody>
                        <tr>
                            <th><label>Username:</label></th>
                            <td><input  value={this.state.username} onChange={this.nameChange} type="text"  required/></td>
                        </tr>
                        <tr>
                            <th><label>First Name:</label></th>
                            <td><input  value={this.state.fName} onChange={this.fNameChange} type="text" required/></td>
                        </tr>
                        <tr>
                            <th><label>Last Name:</label></th>
                            <td><input value={this.state.LName} onChange={this.lNameChange} type="text" required/></td>
                        </tr>
                        <tr>
                            <th><label>Password:</label></th>
                            <td><input value={this.state.pswd} onChange={this.pswdChange} type="password" required /></td>
                        </tr>
                        <tr>
                            <th><label>Confirm Password:</label></th>
                            <td><input value={this.state.cpswd} onChange={this.cpswdChange} type="password" required /></td>
                        </tr>
                        <tr>
                            <th><label>Email:</label></th>
                            <td><input value={this.state.email} onChange={this.emailChange} type="email" required /></td>
                        </tr>
                        <tr>
                            <th><label>Phone Number:</label></th>
                            <td><input value={this.state.phone} onChange={this.phoneChange} type="text" required/></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input type="submit" value="SIGN UP" required/></td>
                        </tr>
                       
                    </tbody>
                    </table>
                 </form>
                
            </div>
        )
    }
}
export default Register