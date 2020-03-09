import React from 'react';

function ClientIntake(props) {
    
    //handle formatting date
    let dob = props.dob;
    let date = new Date(dob);
    let formattedDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

    
    //handle formatting gender
    let clientGender = "";
    if(props.gender === "1.0"){
        clientGender = "Male";
    }else if (props.gender === "2.0"){
        clientGender = "Female"
    }else{
        clientGender = "Other"
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