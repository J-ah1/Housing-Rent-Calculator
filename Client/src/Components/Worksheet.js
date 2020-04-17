import React from 'react';

import ReactLoading from 'react-loading';

const Worksheet = (props) => {
    if(props.isLoading){
        return(
            <div className="card" id="client-intake-info-container">
                 <ReactLoading id="client-intake-loading" type={'spin'} color={'turquoise'} height={50} width={50}/>
            </div>
        );
    }else{
        return(
            <div className="card worksheet-container mt-5" align="center">
                <div className="card-header worksheet-header">
                    <button className="btn text-white" id="client-profile-add-worksheet" onClick={props.toNewWorksheet}>Calculate a new rent worksheet</button>
                    <h1>Worksheet </h1>
                </div>   
                <table style={{width: '75%'}} border="2" cellPadding="10px">
                    <thead>
                        <tr>
                            <th>Date of Submission</th>
                            <th>Rent Calculation</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.worksheets.length > 0 ? props.worksheets.map((sheet, index)=> {
                            return(
                                <tr key={index}>
                                    <td>{sheet.Date}</td>
                                    <td>${sheet.Calculation}</td>
                                    <td><button onClick={props.toView} id={sheet.ID}>View</button><button>Print</button></td>
                                </tr>
                            )
                        }) : null}
                    </tbody>
                </table>    
            </div>
        );
    }
    

}

export default Worksheet;