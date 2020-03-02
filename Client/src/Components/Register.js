import React, { Component } from 'react';
import './App.css';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

const formValid =  ({formErrors, ...rest}) => {
  let valid = true;

  //validate form errors  being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false)
  });


//validate the form was filled out
  Object.values(rest).forEach(val => {
    val == null && (valid = false)
  });


  return valid;
}

class App extends Component{
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      password: null,
      formErrors: {
        username: "",
        firstName: "",
        lastName: "",
        email:"",
        phone:"",
        password:""

      }
    };
  }

handleSubmit = e => {
  //stop the form from submitting
  e.preventDefault();

  // if(formValid(this.state.formErrors)){
    if(formValid(this.state)){
    console.log(`
      --SUBMITTING--
      Username: ${this.state.username}
      First Name: ${this.state.firstName}
      Last Name: ${this.state.lastName}
      Email Name: ${this.state.email}
      Phone Number: ${this.state.phone}
      Password: ${this.state.password}
    `)
  }else {
    console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
  }
};


handleChange = e => {
  e.preventDefault();
  // const { name } = e.target;
  // const { value } = e.target;
  const { name, value} = e.target;
  let formErrors = this.state.formErrors;

  // console.log("Name: ", name);
  // console.log("value: ", value);

  switch (name) {
    case 'username':
      formErrors.username = value.length < 3 && value.length > 0
      ? "minimum 3 characters required"
      : "";
      break;

    case 'firstname':
      formErrors.firstName = value.length < 3 && value.length > 0
      ? "minimum 3 characters required"
      : "";
      break;

      case 'lastname':
      formErrors.lastName = value.length < 3 && value.length > 0
      ? "minimum 3 characters required"
      : "";
      break;

      case 'email':
      formErrors.email =
      emailRegex.test(value)
      ? ""
      : "invalid email address";
      break;

      case 'phone':
      formErrors.phone = value.length <10 && value.length > 0
      ? "minimum 10 characters required"
      : "";
      break;

      case 'password':
      formErrors.password = value.length <6 && value.length > 0
      ? "minimum 6 characters required"
      : "";
      break;
    default:
      break;
  }

  this.setState({formErrors, [name]: value}, () => console.log(this.state))
};

  render() {

    const {formErrors} = this.state;

    return (
      <div className="wrapper">
        <div className= "form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>


          <div className="username">
              <label htmlFor="username">Username</label>
              <input
              className={formErrors.username.length > 0 ? "error" : null}
              placeholder = "username"
              type = "text"
              name = "username"
              onChange = {this.handleChange}
              noValidate/>

              {formErrors.username.length > 0 && (
              <span className = "errorMessage">{formErrors.username}</span>
            )}

            </div>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
              className={formErrors.firstName.length > 0 ? "error" : null}
              placeholder = "First Name"
              type = "text"
              name = "firstname"
              onChange = {this.handleChange}
              noValidate/>

              {formErrors.firstName.length > 0 && (
              <span className = "errorMessage">{formErrors.firstName}</span>
            )}

            </div>

            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
              className= {formErrors.lastName.length > 0 ? "error" : null}
              placeholder = "Last Name"
              type = "text"
              name = "lastname"
              onChange = {this.handleChange}
              noValidate/>

              {formErrors.lastName.length > 0 && (
              <span className = "errorMessage">{formErrors.lastName}</span>
            )}
            </div>



            <div className="email">
              <label htmlFor="firstName">Email</label>
              <input
              className= {formErrors.email.length > 0 ? "error" : null}
              placeholder = "email"
              type = "email"
              name = "email"
              onChange = {this.handleChange}
              noValidate/>

              {formErrors.email.length > 0 && (
              <span className = "errorMessage">{formErrors.email}</span>
            )}
            </div>


            <div className="phone">
              <label htmlFor="phone">phone</label>
              <input
              className={formErrors.phone.length > 0 ? "error" : null}
              placeholder = "phone"
              type = "text"
              name = "phone"
              onChange = {this.handleChange}
              noValidate/>

              {formErrors.phone.length > 0 && (
              <span className = "errorMessage">{formErrors.phone}</span>
            )}

            </div>




            <div className="password">
              <label htmlFor="password">Password</label>
              <input
              className= {formErrors.password.length > 0 ? "error" : null}
              placeholder = "password"
              type = "password"
              name = "password"
              onChange = {this.handleChange}
              noValidate/>

            {formErrors.password.length > 0 && (
              <span className = "errorMessage">{formErrors.password}</span>
            )}
            </div>

            <div className = "createAccount">
              <button type = "submit"> Create Account</button>
              {/* <small>Already Have an Account?</small> */}
            </div>

          </form>
        </div>
      </div>
    );
  }
}

export default App;
