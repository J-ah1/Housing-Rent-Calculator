import React, { Component } from 'react'

 class Rentstart extends Component {
    render() {
        return (
            <div align="center">
                <h1>Rent Calculation </h1>
                <h2>
                You are about to add this patient into the database. Please be honest about their information.
                         
                </h2>
                <button type="button" onClick={() => {  this.props.history.push("rentcalculatestart/4");}}>
                                <i className="fa fa-dot-circle-o"></i>Start
                            </button>
       
                           
            </div>
        )
    }
}

export default Rentstart
