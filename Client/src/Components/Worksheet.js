import React from 'react';
import {Link} from 'react-router-dom';

function Worksheet(props) {
    return (
        <div align="center">
                <Link to={{pathname: '/rentcalc', state: {id: props.id}}}><button>Calculate a New Rent Worksheet</button></Link>
                <h1>Worksheet </h1>
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
                                        <td><button>View</button><button>Print</button></td>
                                    </tr>
                                )
                            }) : null}
                        </tbody>
                    </table>    
            </div>
    );
}

export default Worksheet;