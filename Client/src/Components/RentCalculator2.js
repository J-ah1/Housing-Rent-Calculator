import React from 'react';
import {calcQuestions} from '../Questions';

function questionType(props, type, count){
    let input
    switch(type){
        case("dollar"):
            input = <input onChange={props.inputHandler} id={count} type="number" min="0" />
            break;
        case("number"):
            input = <input onChange={props.inputHandler} id={count} type="number" min="0" />
            break;
        case("radio"):
            input = <div onChange={props.inputHandler}>
                    <input type="radio" id={count} name={count} value="Yes" />
                    <label htmlFor="Yes">Yes</label>
                    <input type="radio" id={count} name={count} value="No" />
                    <label htmlFor="No">No</label>
                </div>
            break;
        default:
            //console.log(type);
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
                            <td><input value={props.answer1 > 0 ? props.answer1 : 0} readOnly/></td>
                        </tr>
                        <tr>
                            <td>{results[1].label}</td>
                            <td><input defaultValue={props.answer > 0 ? props.answer : 0} readOnly/></td>
                        </tr>
                        <tr>
                            <td>{results[2].label}</td>
                            <td><input defaultValue={props.answer > 0 ? props.answer : 0} readOnly/></td>
                        </tr>
                    </tfoot>
                </table>         
                <button type="button" onClick={ props.viewHandler} style={{float : 'right', paddingRight : '5px'}}>Next</button>
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