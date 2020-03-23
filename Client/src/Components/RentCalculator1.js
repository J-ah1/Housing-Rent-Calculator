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
            input = <div /*onChange={props.inputHandler*/>
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



export default function RentCalculator1(props){ 
    let questions = [calcQuestions['annualHouseholdWages'], calcQuestions['periodicPayment'], calcQuestions['unearnedIncome'], 
                    calcQuestions['receivedIncome'], calcQuestions['businessIncome'], calcQuestions['investments'], 
                    calcQuestions['armedForcesPay'], calcQuestions['publicAssistanceRecieved'], calcQuestions['welfareReliant']]

    let results = [calcQuestions['annualGrossIncome'], calcQuestions['monthlyGrossIncome']]
    let count = -1;

    return(
        <div align="center">
                {/* Here is where you add the contents of what will be displayed to screen */}

                {/* <button type = "button" onClick = { props.logOffHandler} style={{float : 'right', paddingRight : '5px'}}>Sign Out</button> */}
                <h1>Gross Household Income</h1>
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
                            <td><input value={props.total1 > 0 ? props.total1 : 0} readOnly/></td>
                        </tr>
                        <tr>
                            <td>{results[1].label}</td>
                            <td><input value={props.total2 > 0 ? props.total2 : 0} readOnly/></td>
                        </tr>
                    </tfoot>
                </table>
                <button type = "button" onClick = { props.viewHandler} style={{float : 'right', paddingRight : '5px'}}>Next</button>
        </div>    
    )  
}