import React from 'react';
import {calcQuestions} from '../Questions';

import '../Styles/Calculator.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";



function questionType(props, type, count){
    let input
    switch(type){
        case("radio"):
            input = <div className="rent-calc-radio-container">
                        <input type="radio" id={count} name={count} onChange={props.inputHandler} checked={props.results[count] === "Yes" ? true : false}  value="Yes" />
                        <label className="mr-3" htmlFor="Yes">Yes</label>
                        <input type="radio" id={count} name={count} onChange={props.inputHandler} checked={props.results[count] === "No" ? true : false} value="No" />
                        <label htmlFor="No">No</label>
                    </div>
            break;
        case("date"):
            input = <div>
                <DatePicker
                    id={count}
                    selected={props.startDate}
                    onChange={props.dateHandler} 
                    placeholderText="mm-dd-yyyy"
                />
            </div>
            break;
        default:
            input = <div>
            <input onChange={props.inputHandler} id={count} value={props.results[count]} type="number" min="0" />
            </div>
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
        <div className="rent-calc-container" align="center">
        {/* Here is where you add the contents of what will be displayed to screen */}
            <div className="rent-calc-foreground">
                {/* <button type = "button" onClick = { props.logOffHandler} style={{float : 'right', paddingRight : '5px'}}>Sign Out</button> */}
                <h1>Earned Income Disregard</h1>
                <div className="rent-calc-container-content">
                    {questions.map(question => {
                                        count++
                                        return (<div className="rent-calc-question-container" key={count}>
                                            <div className="rent-calc-question-label-description">
                                                <p className="rent-calc-label">{count + 20}. {question.label}</p>
                                                <p className="rent-calc-description">{question.description}</p>
                                            </div>
                                            
                                            {questionType(props, question.type, count)}
                                            
                                        </div>)
                                    }
                        )
                    }
                    <div className="rent-calc-question-container mt-3 mb-4">
                        <p className="rent-calc-label">{"28. "+results[0].label+"\t"}
                            <button type="button" className="rent-calc-help" data-toggle="popover" title="Calculation Explanation" data-content={results[0].notes} >?</button>
                        </p>
                        <input className="rounded" value={props.total1} readOnly/>
                    </div>
                </div>
            </div>
        </div>
    )
}