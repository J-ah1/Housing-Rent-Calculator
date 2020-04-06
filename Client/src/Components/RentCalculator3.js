import React from 'react';
import {calcQuestions} from '../Questions';

import '../Styles/Calculator.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";



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
            // input = <input onChange={props.inputHandler} id={count} value={props.results[count]} type="date"  />
            input = <div>
                        <DatePicker
                            selected={props.startDate}
                            onChange={props.inputHandler} 
                            id={count} 
                            value={props.results[count]}
                        />
                    </div>
            break;
        default:
            input = <input onChange={props.inputHandler} id={count} value={props.results[count]} type="number" min="0" />
            break;
    }
    return input
}

export default function RentCalculator3(props){
    let questions = [calcQuestions['inHOPWA'], calcQuestions['employmentIncomeIncrease'], calcQuestions['selfSufficientIncome'], 
                    calcQuestions['incomeWSixMo'], calcQuestions['incomeIncreaseDate'], calcQuestions['baselineIncome'], calcQuestions['incomeEID'], 
                    calcQuestions['otherIncomeEID']]

    let results = [calcQuestions['applicableEID']]
    let count = -1;

    return( 
        <div align="center">
        {/* Here is where you add the contents of what will be displayed to screen */}

            {/* <button type = "button" onClick = { props.logOffHandler} style={{float : 'right', paddingRight : '5px'}}>Sign Out</button> */}
            <h1>Earned Income Disregard</h1>
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
                    </tfoot>
            </table>
        </div>
    )
}