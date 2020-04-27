import React from 'react';

export default function RentCalculator0(props){ 
    console.log(test())
    return(
        <div id="rent-calc-intro-container" className="card pb-5" align="center">
                <div id="rent-calc-intro-heading" className="card-header" >
                    <button className="btn text-white mt-2" type = "button" onClick = {props.backHandler} >Back</button>
                    <h1>Welcome to the Rent Calculator </h1>
                    <span></span>
                </div>

                <div id="rent-calc-intro-description">
                    <p>
                        INSTRUCTIONS: When completing the rent calculator, include the total ANNUAL gross income of all eligible household members (e.g., payment amount multiplied by number of payment periods per year for all income sources). As per HUD regulations, agencies must obtain proof of income documentation such as pay stubs, budget letters, Social Security Income/Disability award letters, Income/Self Employment Verification (if no pay stubs are given or if self-employed), and Zero Income Affidavit* (if consumer reports no income) prior to performing the official rent calculation. Furthermore, agencies are required to maintain copies of annual income documentation in the consumer chart.
                    </p>
                </div>
        </div>      
    )  
}