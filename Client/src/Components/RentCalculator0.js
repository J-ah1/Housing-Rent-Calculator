import React from 'react';

export default function RentCalculator0(props){ 
    return(
        <div align="center">
                <button type = "button" onClick = {props.backHandler} style={{float : 'left', paddingRight : '5px'}}>Back</button>
                {/* <button type = "button" onClick = { props.logOffHandler} style={{float : 'right', paddingRight : '5px'}}>Sign Out</button> */}
                <h1>Welcome to the Rent Calculator </h1>
                <p>This is where the disclaimer text will go.
                    You're about start the rent calculator.
                    Please handle the client's information properly.
                    ....
                </p>
        </div>    
    )  
}