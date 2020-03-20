import React from 'react';

export default function RentCalculator0(props){ 
    return(
        <div align="center">
                <h1>Welcome to the Rent Calculator </h1>
                <p>This is where the disclaimer text will go.
                    You're about start the rent calculator.
                    Please handle the client's information properly.
                    ....
                </p>
                <button type="button" onClick={props.startHandler}>Start</button>
        </div>    
    )  
}