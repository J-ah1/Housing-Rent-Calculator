import React, {Component} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import '../Styles/Register.css'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            fName: "",
            lName: "",
            pswd: "",
            cpswd: "",
            email: "",
            phone: "",
            question: 0,
            answer: ""
        }
    }


    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handlePhoneNumberChange = (e) => {

        const phone = e.target.value;

        const numbers = /^[0-9] || [-]+$/;
        if(phone.match(numbers) || phone === ""){
            this.setState({phone})
        }
    }

    questionChange = (e) => {
      this.setState({
          question: parseInt(e.target.value)
      })
    }

    handleBack = () => {
        this.props.history.push('/');
    }

    submit = (e) => {
        e.preventDefault();
        if(this.state.username !== "" && this.state.pswd !== "" && this.state.fName !== "" &&
        this.state.phone !== "" && this.state.email !== "" && this.state.cpswd === this.state.pswd && this.state.lName !=="" ){
          console.log(`Username: ${this.state.username}, 
                      Password: ${this.state.pswd},
                      ConfirmPass: ${this.state.cpswd},
                      First: ${this.state.fName},
                      Last: ${this.state.lName},
                      Phone: ${this.state.phone},
                      Email: ${this.state.email},
                      Question: ${this.state.question},
                      Answer: ${this.state.answer},`);
          axios.get(`http://localhost:8000/db.cfc?method=registerUser&username=${this.state.username}&password=${this.state.pswd}&firstname=${this.state.fName}&lastname=${this.state.lName}&email=${this.state.email}&phone=${this.state.phone}&squestion=${this.state.question}&sanswer=${this.state.answer}`, {withCredentials: true})
            .then(res => {
                axios.get(`http://localhost:8000/db.cfc?method=checkUser&username=${this.state.username}&password=${this.state.pswd}`, {withCredentials: true})
                .then(res => {
                    Cookies.set("userID", res.data.UID)
                    this.props.history.push({
                        pathname: '/search',
                    })
                    window.location.reload()
                })
            })
        }
        else {
            alert("Please enter information in all fields")
        }
    }
    
    render() {
        return (


            <div className="mt-5 mb-5" id="register-card-container">
                <div className="card" id="register-card-content-container">
                    <div className="card-header" style={{textAlign:'center'}}>
                            <h1>Create New User</h1>
                    </div>
                    <form  id="register-form" onSubmit={this.submit}>  
                        <div className="register-form-question-container">
                            <label className="font-weight-light pr-2"> Username: </label>
                            <input name="username"  onChange={this.handleInputChange} value={this.state.username} type="text"  required/>
                        </div>

                        <div className="register-form-divider">
                        </div>

                        <div className="register-form-question-group" >
                            <div className="register-form-question-container">
                                <label  className="font-weight-light pr-2">First Name:</label>
                                <input name="fName"  onChange={this.handleInputChange}    value={this.state.fName} type="text" required/>
                            </div>
                            <div className="register-form-question-container">
                            <label  className="font-weight-light pr-2">Last Name:</label>
                            <input name="lName"  onChange={this.handleInputChange}    value={this.state.lName} type="text" required/>
                        </div>
                        </div>
                        <div className="register-form-question-group">
                        <div className="register-form-question-container">
                            <label>Password:</label>
                            <input name="pswd" onChange={this.handleInputChange}  value={this.state.pswd} type="password" required />
                        </div>

                        <div className="register-form-question-container">
                            <label>Confirm Password:</label>
                            <input name="cpswd"  onChange={this.handleInputChange}  value={this.state.cpswd} type="password" required />
                        </div>
                        </div>
                        

                        <div className="register-form-question-container">
                             <label>Email:</label>
                             <input name="email"  onChange={this.handleInputChange}  value={this.state.email} type="email" required />
                        </div>

                        <div className="register-form-question-container">
                             <label>Phone Number:</label>
                             <input name="phone"  onChange={this.handlePhoneNumberChange}  value={this.state.phone} type="tel" placeholder="000-000-0000" required/>
                         </div>
                        <div className="register-form-divider">
                        </div>

                        <div className="register-form-question-container">
                             <label>Security Question:</label>
                             <select style={{width: '30vw'}} value={this.state.question} onChange={this.questionChange}>
                                 <option defaultValue value="0">What is your mother’s maiden name?</option>
                                 <option value="1">What was the name of your first pet?</option>
                                 <option value="2">What was the name of your elementary school?</option>
                                 <option value="3">What is your favorite movie?</option>
                                 <option value='4'>What is your favorite book?</option>
                               </select>
                        </div>

                        <div className="register-form-question-container">
                            <label>Security Answer:</label>
                            <input name="answer"  onChange={this.handleInputChange}  value={this.state.answer}  type="text" required/>
                        </div>

                        <div className="card-footer">
                            <div id="register-form-button-container">
                                
                                <button id="register-button-back" className="btn" onClick={this.handleBack}>Back</button>
                                <button id="register-button-submit" className="btn text-white" onClick={this.submit}>Submit</button>
                            </div>

                        </div>

                    </form>
                </div>
            </div>
        )
    }
}
export default Register
