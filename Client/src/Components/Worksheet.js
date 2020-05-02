import React from 'react';
import ReactLoading from 'react-loading';

import view from  '../Icons/view.png'
import print from '../Icons/print.png'


const Worksheet = (props) => {
    if(props.isLoading){
        return(
            <div className="card" id="client-intake-info-container">
                 <ReactLoading id="client-intake-loading" type={'spin'} color={'turquoise'} height={50} width={50}/>
            </div>
        );
    }else{
        return(
            <div className="card worksheet-container mt-5">
                <div className="card-header" id="worksheet-header"> 
                    <button className="btn" id="dummy-button"> button for spacing</button>
                    <h1>Worksheet</h1>
                    <button className="btn text-white" id="client-profile-add-worksheet" onClick={props.toNewWorksheet}> <b>+</b> New Worksheet</button>
                </div>   
                <table className="table">
                    <thead className="thead-light" align="center">
                        <tr > 
                            <th>Date of Submission</th>
                            <th>Rent Calculation</th>
                            <th className="pl-5">Action</th>
                        </tr>
                    </thead>
                    <tbody align="center">
                        {props.worksheets.length > 0 ? props.worksheets.map((sheet, index)=> {
                            return(
                                <tr key={index}>
                                    <td>{sheet.Date}</td>
                                    <td>${sheet.Calculation}</td>
                                    <td style={{display: 'flex', justifyContent: 'flex-end'}} className="pl-5"> 
                                        <div onClick={props.toView} className="worksheet-container-button-icon">
                                            <img className="worksheet-icons" src={view} id={sheet.ID} ></img> 
                                            <button className="btn text-white client-profile-worksheet-action-button" id={sheet.ID}>View</button>
                                        </div>
                                        <div onClick={props.print} className="pl-2" >
                                            <img  className="worksheet-icons"  src={print} id={sheet.ID}></img>
                                            <button className="btn text-white client-profile-worksheet-action-button" id={sheet.ID}>Print</button> 
                                        </div>
                                    </td>
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
