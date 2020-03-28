import React from 'react';
import {calcQuestions} from '../Questions';

function questionType(props, type, count){
    let input
    switch(type){
        case("radio"):
            input = <div>
                    <input type="radio" id={count} name={count} onChange={props.inputHandler} checked={props.results[count] === "Yes" ? true : false}  value="Yes" />
                    <label htmlFor="Yes">Yes</label>
                    <input type="radio" id={count} name={count} onChange={props.inputHandler} checked={props.results[count] === "No" ? true : false} value="No" />
                    <label htmlFor="No">No</label>
                </div>
            break;
        default:
            input = <input onChange={props.inputHandler} id={count} value={props.results[count]} type="number" min="0" />
            break;
    }
    return input
}

export default function RentCalculator5(props){ 
    let questions = [calcQuestions['totalMonthlyRent'], calcQuestions['currentLeasePeriod'], calcQuestions['utilitiesIncluded'], 
                    calcQuestions['utilityAllowance']]

    let results = [calcQuestions['tenantRentResponsibility'], calcQuestions['rentSubsidyPayment']]
    let count = -1;

    return(
        <div align="center">
                <h1>Results</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Description</th>
                            <th>Response</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map(question => {
                            count++
                            return (<tr key={count}>
                                <td>{question.label}</td>
                                <td>{question.description}</td>
                                <td>{questionType(props, question.type, count)}</td>
                            </tr>)
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>{results[0].label}</td>
                            <td>{results[0].description}</td>
                            <td><input value={props.total1} readOnly/></td>
                        </tr>
                        <tr>
                            <td>{results[1].label}</td>
                            <td><input value={props.total2} readOnly/></td>
                        </tr>
                    </tfoot>
                </table>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '2%'}}>
                   <button onClick={props.submit}>Submit</button>
                </div>
        </div>    
    )  
}