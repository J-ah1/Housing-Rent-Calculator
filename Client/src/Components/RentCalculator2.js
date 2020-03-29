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
        case("date"):
            input = <input onChange={props.inputHandler} id={count} value={props.results[count]} type="date"  />
            break;
        default:
            input = <input onChange={props.inputHandler} id={count} value={props.results[count]} type="number" min="0" />
            break;
    }
    return input
}

export default function RentCalculator2(props){ 


    let questions = [calcQuestions['numDependents'], calcQuestions['disabledDeduction'], calcQuestions['childcareExp'], 
                    calcQuestions['attendExp'], calcQuestions['elderlyExp']]

    let results = [calcQuestions['medExp'], calcQuestions['perAGI'], calcQuestions['medDeduction']]
    let count = -1;

    return(
        <div align="center">
                <h1>Monetary Allowances</h1>
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
                            <td><input value={props.total1} readOnly/></td>
                        </tr>
                        <tr>
                            <td>{results[1].label}</td>
                            <td><input value={props.total2} readOnly/></td>
                        </tr>
                        <tr>
                            <td>{results[2].label}</td>
                            <td><input value={props.total3 > 0 ? props.total3 : 0} readOnly/></td>
                        </tr>
                    </tfoot>
                </table> 
        </div>    
    )  
}

/*
{results.map(result => {
                            count++
                            return (<tr key={count}>
                                <td>{result.label}</td>
                                <td>{questionType(props, result.type, count)}</td>
                            </tr>)
                        })}
*/