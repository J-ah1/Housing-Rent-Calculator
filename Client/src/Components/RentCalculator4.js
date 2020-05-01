import React from 'react';
import {calcQuestions} from '../Questions';

export default function RentCalculator4(props){ 
   
    let results = [calcQuestions['annualGrossIncome'], calcQuestions['totalAllowance'], calcQuestions['annualAdjustedIncome'], calcQuestions['monthlyAdjustedIncome']]
    
    return(
        <div className="rent-calc-container" align="center">
               
               <div className="rent-calc-foreground">
                    <h1>Monetary Allowances</h1>

                    <div className="rent-calc-container-content">

                        <div className="rent-calc-result-container">
                            <div>
                                <p 
                                    className="rent-calc-label">{"29. "+results[0].label+"\t"}
                                    <button type="button" className="rent-calc-help" data-toggle="popover" title="Calculation Explanation" data-content="Calculation: Annual Gross Income" >?</button>
                                </p>
                            </div>
                            <div className="rent-calc-money-container">
                                <input className="rounded rent-calc-money-input" value={props.total1} onChange={props.inputHandler}  readOnly/>
                            </div>
                            <div>
                                <button className="btn text-white rent-calc-button" type="button" onClick={() => props.viewHandler(1)}>Review</button>
                            </div>
                            
                        </div>
                        <div className="rent-calc-result-container">
                            <div>
                                <p 
                                    className="rent-calc-label mr-5">{"30. "+results[1].label+"\t"}
                                    <button type="button" className="rent-calc-help" data-toggle="popover" title="Calculation Explanation" data-content={results[1].notes} >?</button>
                                </p>
                            </div>
                            <div className="rent-calc-money-container">
                                <input className="rounded rent-calc-money-input"  value={props.total2} readOnly/>
                            </div>
                            <div>
                            <button className="btn text-white rent-calc-button" type="button" onClick={() => props.viewHandler(2)}>Review</button>
                            </div>
                        </div>

                        <div className="rent-calc-result-container">
                            <div>
                            <p 
                                className="rent-calc-label">{"31. "+results[2].label+"\t"}
                                <button type="button" className="rent-calc-help" data-toggle="popover" title="Calculation Explanation" data-content={results[2].notes} >?</button>
                            </p>
                            </div>
                            <div className="rent-calc-money-container">
                            <input className="rounded rent-calc-money-input"  value={props.total3 } readOnly/>
                            </div>
                            <div>
                            <button className="btn text-white rent-calc-button" type="button" onClick={() => props.viewHandler(3)}>Review</button>
                            </div>
                        </div>

                        <div className="rent-calc-result-container">
                            <div>
                            <p 
                                className="rent-calc-label">{"32. "+results[3].label+"\t"}
                                <button type="button" className="rent-calc-help" data-toggle="popover" title="Calculation Explanation" data-content={results[1].notes} >?</button>
                            </p>
                            </div>
                            <div className="rent-calc-money-container">
                                <input className="rounded rent-calc-money-input"  value={props.total4} readOnly/>
                            </div>
                            <div>
                                <button className="btn text-white rent-calc-button" type="button" onClick={() => props.viewHandler(2)}>Review</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>    
    )  
}
