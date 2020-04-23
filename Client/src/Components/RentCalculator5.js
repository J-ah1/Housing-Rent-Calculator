import React from 'react';
import {calcQuestions} from '../Questions';

function questionType(props, type, count){
    let input
    switch(type){
        case("radio"):
            input = <div>
                    <input className="mr-2" type="radio" id={count} name={count} onChange={props.inputHandler} checked={props.results[count] === "Yes" ? true : false}  value="Yes" />
                    <label className="mr-3" htmlFor="Yes">Yes</label>
                    <input className="mr-2" type="radio" id={count} name={count} onChange={props.inputHandler} checked={props.results[count] === "No" ? true : false} value="No" />
                    <label htmlFor="No">No</label>
                </div>
            break;
        case("date"):
            input = <input onChange={props.inputHandler} id={count} value={props.results[count]} type="date"  />
            break;
        default:
            input = <input className="rounded"  onChange={props.inputHandler} id={count} value={props.results[count]} type="number" min="0" />
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
        <div className="rent-calc-container" align="center">
                <h1>Results</h1>

                <div className="rent-calc-container-content">

                    {questions.map(question => {
                                count++
                                return (<div className="rent-calc-question-container" key={count}>
                                    <div className="rent-calc-question-label-description">
                                        <p className="rent-calc-label">{count + 1}. {question.label}</p>
                                        <p className="rent-calc-description">{question.description}</p>
                                    </div>
                                    <div>
                                    {questionType(props, question.type, count)}
                                    </div>
                                </div>)
                    })}
                    <div className="rent-calc-question-container">
                        <div className="rent-calc-question-label-description">
                            <p className="rent-calc-label">{results[0].label+"\t"}
                                <button type="button" className="rent-calc-help" data-toggle="popover" title="Calculation Explanation" data-content={results[0].notes} >?</button>
                            </p>
                            <p className="rent-calc-description">{results[0].description}</p>
                        </div>
                        <div>
                            <input className="rounded"  value={props.total1} readOnly/>
                        </div>
                    </div>
                    <div className="rent-calc-question-container">
                        <p className="rent-calc-label"> {results[1].label+"\t"}
                            <button type="button" className="rent-calc-help" data-toggle="popover" title="Calculation Explanation" data-content={results[1].notes} >?</button>
                        </p>
                        <input className="rounded"  value={props.total2} readOnly/>
                    </div>
                </div>
                <div className="mt-5 mb-5">
                   <button className="btn text-white rent-calc-button" onClick={props.submit}>Submit</button>
                </div>
        </div>    
    )  
}