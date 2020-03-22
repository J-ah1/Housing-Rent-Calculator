import React from 'react';

export default function RentCalculator1(props){ 
    return(
        <div align="center">
                {/* Here is where you add the contents of what will be displayed to screen */}

                {/* <button type = "button" onClick = { props.logOffHandler} style={{float : 'right', paddingRight : '5px'}}>Sign Out</button> */}
                <h1>Page 1</h1>
            
                <button type = "button" onClick = { props.viewHandler} style={{float : 'right', paddingRight : '5px'}}>Next</button>
        </div>    
    )  
}