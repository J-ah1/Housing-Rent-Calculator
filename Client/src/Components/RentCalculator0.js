import React from 'react';
//import {Link, Redirect} from 'react-router-dom';

function RentCalculator0(props){ 
    return(
        <div align="center">
                {/* <button onClick = { (e) => {props.clickedBack() } } style={{float : 'left', paddingRight : '5px'}}>Back</button> */}
                <button type = "button" onClick = {props.backHandler} style={{float : 'left', paddingRight : '5px'}}>Back</button>
                <button type = "button" onClick = { props.logOffHandler} style={{float : 'right', paddingRight : '5px'}}>Sign Out</button>
                <h1>Welcome to the Rent Calculator </h1>
                <p>This is where the disclaimer text will go.
                    You're about start the rent calculator.
                    Please handle the client's information properly.
                    ....
                </p>
                <button type = "button" onClick = {props.startHandler} >Start</button>
        </div>    
    )  
}
export default RentCalculator0;
