import React from 'react';
import {calcQuestions} from '../Questions';

export default function RentCalculator4(props){ 
   
    let results = [calcQuestions['annualGrossIncome'], calcQuestions['totalAllowance'], calcQuestions['annualAdjustedIncome'], calcQuestions['monthlyAdjustedIncome']]
    
    return(
        <div className="rent-calc-container" align="center">
                <h1>Monetary Allowances</h1>

                <div className="rent-calc-container-content">

                    <div className="rent-calc-result-container">
                        <div>
                            <p className="rent-calc-label">{results[0].label}</p>
                        </div>
                        <div>
                            <input className="rounded" value={props.total1} onChange={props.inputHandler}  readOnly/>
                        </div>
                        <div>
                            <button className="btn text-white rent-calc-button" type="button" onClick={() => props.viewHandler(1)}>Review</button>
                        </div>
                        
                    </div>
                    <div className="rent-calc-result-container">
                        <div>
                            <p className="rent-calc-label mr-5">{results[1].label}</p>
                        </div>
                        <div>
                        <input className="rounded"  value={props.total2} readOnly/>
                        </div>
                        <div>
                        <button className="btn text-white rent-calc-button" type="button" onClick={() => props.viewHandler(2)}>Review</button>
                        </div>
                    </div>

                    <div className="rent-calc-result-container">
                        <div>
                        <p className="rent-calc-label">{results[2].label}</p>
                        </div>
                        <div>
                        <input className="rounded"  value={props.total3 } readOnly/>
                        </div>
                        <div>
                        <button className="btn text-white rent-calc-button" type="button" onClick={() => props.viewHandler(3)}>Review</button>
                        </div>
                    </div>

                    <div className="rent-calc-result-container">
                        <div>
                        <p className="rent-calc-label">{results[3].label}</p>
                        </div>
                        <div>
                        <input className="rounded"  value={props.total4} readOnly/>
                        </div>
                        <div>
                        <button className="btn text-white rent-calc-button" type="button" onClick={() => props.viewHandler(2)}>Review</button>
                        </div>
                    </div>
                </div>
        </div>    
    )  
}
