import React, { Component } from 'react';

class RentCalculator0 extends Component {
    clickedStart(){
        console.log('Take the user to the first page of the rent calculator.')
        //redirect to first page of rent calculator
        /*this.props.history.push({
            pathname: '/rc1',
        })*/
    }

    clickedBack(){
        console.log('Take the user back to the client worksheets page.')
        //this needs to be changed so that it redirects to the profile page with client ID
        this.props.history.push({
            pathname: '/profile/${id}',
        })
    }

    clickedLogOff(){
        console.log('Log the user off.')
        this.props.history.push({
            pathname: '/',
        })
    }

    render(){
        return(
            <div align="center">
                    <button onClick = { (e) => {this.clickedBack() } } style={{float : 'left', paddingRight : '5px'}}>Back</button>
                    <button onClick = { (e) => {this.clickedLogOff() } } style={{float : 'right', paddingRight : '5px'}}>Sign Out</button>
                    <h1>Welcome to the Rent Calculator </h1>
                    <p>This is where the disclaimer text will go.
                        You're about start the rent calculator.
                        Please handle the client's information properly.
                        ....
                    </p>
                    <button onClick = { (e) => {this.clickedStart() } } >Start</button>
            </div>
            
        )
    }
}
export default RentCalculator0;