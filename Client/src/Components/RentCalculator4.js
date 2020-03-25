import React from 'react';
import {calcQuestions} from '../Questions';





export default function RentCalculator4(props){ 
   

    // let questions = [calcQuestions['annualGrossIncome'], calcQuestions['disabledDeduction'], calcQuestions['childcareExp'], 
    //                 calcQuestions['attendExp'], calcQuestions['elderlyExp']]

    let results = [calcQuestions['annualGrossIncome'], calcQuestions['totalAllowance'], calcQuestions['annualAdjustedIncome'],
    calcQuestions['monthlyAdjustedIncome']]
    let count = -1;

    return(
        <div align="center">
                <h1>Monetary Allowances</h1>
                <table>
                  
                    <tbody>
                        <tr>
                            <td>{results[0].label}</td>
                            <td><input value={props.total1} onChange={props.inputHandler}  readOnly/></td>
                            <td><button type="button" onClick={() => props.reviewHandler(1)}>Review</button></td>
                        </tr>
                        <tr>
                            <td>{results[1].label}</td>
                            <td><input value={props.total2} readOnly/></td>
                            <td><button type="button" onClick={() => props.reviewHandler(2)} >Review</button></td>
                        </tr>
                        <tr>
                            <td>{results[2].label}</td>
                            <td><input value={props.total3 } readOnly/></td>
                            <td><button type="button" onClick={() => props.reviewHandler(3)}>Review</button></td>
                        </tr>
                        <tr>
                            <td>{results[3].label}</td>
                            <td><input value={props.total4} readOnly/></td>
                            <td><button type="button" onClick={() => props.reviewHandler(2)}>Review</button></td>
                        </tr>
                    </tbody>
                </table> 
        </div>    
    )  
}
