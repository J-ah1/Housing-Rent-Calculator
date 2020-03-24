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
        <div>
            <ul>
                <li>
                    {props.name}
                </li>
                <li>
                    Date of Birth: {formattedDate}
                </li>
                <li>
                    Gender: {clientGender}
                </li>
                <li>
                    Address: {props.address}
                </li>
            </ul> 
        </div>
    );
}

export default ClientIntake;