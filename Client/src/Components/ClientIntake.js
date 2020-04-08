import React from 'react';

function ClientIntake(props) {
    
    //handle formatting date
    const date = new Date(props.dob);
    const formattedDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

    
    //handle formatting gender
    let clientGender = "";
    switch(props.gender){
        case(1):
            clientGender = "Male";
            break;
        case(2):
            clientGender = "Female";
            break;
        case('loading'):
            clientGender = "Loading";
            break;
        default:
            clientGender = "Other";
            break;
    }

    return (
        <div className="card" id="client-intake-info-container">
            
            <h2 className="card-header"> {props.name}</h2>
        
            <ul id="client-intake-info-content">
                <li className="ml-5">
                    <span className="font-weight-light">Date of Birth: </span> {formattedDate}
                </li>
                <li className="ml-5">
                    <span className="font-weight-light">Gender: </span> {clientGender}
                </li>
                <li className="ml-5"> 
                    <span className="font-weight-light">Address: </span>{props.address}
                </li>
            </ul> 
        </div>
    );
}

export default ClientIntake;