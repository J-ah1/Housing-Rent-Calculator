import React from 'react';

function ClientIntake(props) {
    
    //handle formatting date
    let dob = props.dob;
    let date = new Date(dob);
    let formattedDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

    
    //handle formatting gender
    let clientGender = "";
    switch(props.gender){
        case(1):
            clientGender = "Male";
            break;
        case(2):
            clientGender = "Female";
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