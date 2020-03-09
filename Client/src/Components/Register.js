import React, {Component} from 'react';


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

    nameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    fNameChange = (e) => {
        this.setState({
            fName: e.target.value
        })
    }

    lNameChange = (e) => {
        this.setState({
            lName: e.target.value
        })
    }

    pswdChange = (e) => {
        this.setState({
            pswd: e.target.value
        })
    }

    cpswdChange = (e) => {
        this.setState({
            cpswd: e.target.value
        })
    }

    emailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    phoneChange = (e) => {
        this.setState({
            phone: e.target.value
        })
    }

    questionChange = (e) => {
      this.setState({
          question: parseInt(e.target.value)
      })
    }

    answerChange = (e) => {
      this.setState({
          answer: e.target.value
      })
    }

    submit = (e) => {
        e.preventDefault();
        if(this.state.username !== "" && this.state.pswd !== "" && this.state.fName !== "" &&
        this.state.phone !== "" && this.state.email !== "" && this.state.cpswd == this.state.pswd && this.state.lName !=="" ){
          console.log(`Username: ${this.state.username}, 
                      Password: ${this.state.pswd},
                      ConfirmPass: ${this.state.cpswd},
                      First: ${this.state.fName},
                      Last: ${this.state.lName},
                      Phone: ${this.state.phone},
                      Email: ${this.state.email},
                      Question: ${this.state.question},
                      Answer: ${this.state.answer},`);
          console.log(typeof this.state.question)
          var request = new XMLHttpRequest();
          request.open("GET", `http://localhost:8000/db.cfc?method=registerUser&username=${this.state.username}&password=${this.state.pswd}&firstname=${this.state.fName}&lastname=${this.state.lName}&email=${this.state.email}&phone=${this.state.phone}&squestion=${this.state.question}&sanswer=${this.state.answer}`, false);
          request.send();
          this.props.history.push('/')
        }
        else {
            alert("Please enter information in all fields")
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
                            <th><label>Security Question:</label></th>
                            <td><select value={this.state.question} onChange={this.questionChange}>
                                <option defaultValue value="0">What is your mother’s maiden name?</option>
                                <option value="1">What was the name of your first pet?</option>
                                <option value="2">What was the name of your elementary school?</option>
                                <option value="3">What is your favorite movie?</option>
                                <option value='4'>What is your favorite book?</option>
                              </select></td>
                        </tr>
                        <tr>
                            <th><label>Security Answer:</label></th>
                            <td><input value={this.state.answer} onChange={this.answerChange} type="text" required/></td>
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
