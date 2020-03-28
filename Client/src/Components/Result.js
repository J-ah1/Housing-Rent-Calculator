import React, { Component } from 'react'

var cid=""
 class Result extends Component {

    constructor(props) {
        super(props);
   
    var query = new  URLSearchParams(this.props.location.search)

    cid=query.get("cid")
        this.state = {
        wid:this.props.match.params.id?this.props.match.params.id:0,
        errorMessage: "",
        clientId:0,
        data:[{}],
        isprint:query.get("isprint")?true:false,
        clientname:"",
       
        };
    }
    componentDidUpdate(){
      
        if(this.state.isprint===true){
          var aaa=  window.print()
         
            this.props.history.push("/")
        }
    }
    componentDidMount(){
       
      
      var request = new XMLHttpRequest();
      request.open("GET", "http://localhost:8000/rentcalculator/index.cfm/worksheet/"+this.state.wid,false);
      request.setRequestHeader("Content-Type", "application/json");
      request.send();
      console.log(request.responseText);
      const resultdata=JSON.parse(request.responseText);
      if(resultdata.status===true){
          this.setState({
            clientId:resultdata.data.clientId,
            data:resultdata.data,
            clientname:resultdata.clientname,
          })
      }
  }

    back=(e)=>{
      this.props.history.push("/rentcalculate/"+this.state.clientId);
    }

    render() {
        return (
            <div className="animated fadeIn" Style="margin:20px" >
                <h1>  {this.state.clientname}</h1>
                <h1 >
              
                {this.state.data.dateSubmitted}
                </h1>
                <button type="submit" size="md" color="success "   onClick={() => {  this.props.history.push("/");}} > Back </button>
                <div >
                    <h1 align="center">Gross Annual Household Income</h1>
                    <table border="2" cellPadding="5px">
                                        <thead>
                                            <tr>
                                                <th width="5%">SNo.</th>
                                                <th>Question</th>
                                                <th>Description</th>
                                                <th width="15%">Response</th>
                                            </tr>
                                        </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Annual household wages and earnings before taxes</td>
                                                    <td>Include the full amount (before payroll deductions) of annual wages and salaries, overtime pay, commissions, fees, tips and bonuses, and other compensation for personal services prior to payroll deductions. ALL INCOME MUST BE ANNUALIZED.</td>
                                                    <td>
                                                    
                                                        <input disabled value={this.state.data.annualHouseHoldWages} />
                                                        
                                                    
                                                    </td>   
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Periodic payments: e.g. social security, retirement funds, annuities, etc.</td>
                                                    <td>Include periodic payments from Social Security, annuities, insurance policies, retirement funds, pensions, disability or death benefits, excluding lump sum payments for the delayed start of a periodic payment. ALL INCOME MUST BE ANNUALIZED.</td>
                                                    <td>
                                                
                                                        <input disabled value={this.state.data.periodicPayment} />
                                                        
                                                    
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>Additional payments: e.g. unemployments, disability, worker's compensation, etc.</td>
                                                    <td>Include unemployment, disability, worker's compensation, and severance pay.</td>
                                                    <td>
                                                
                                                        <input disabled value={this.state.data.unearnedIncome} />
                                                        
                                                    
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td>Alimony, child support</td>
                                                    <td>Periodic payments received including alimony and child support, and regular contributions or gifts received from organizations or persons (including family members) not residing in the household.</td>
                                                    <td>
                                                
                                                        <input disabled value={this.state.data.receivedIncome} />
                                                        
                                                    
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>5</td>
                                                    <td>Net income from operation of a business profession</td>
                                                    <td>Net income from operation of a business or profession (including but NOT limited to hairbraiding, day labor work, etc.).</td>
                                                    <td>
                                                
                                                        <input disabled value={this.state.data.businessIncome} />
                                                        
                                                    
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>6</td>
                                                    <td>Investments and rental income in excess of $5,000 per year</td>
                                                    <td>Interest, dividends, and other net income of any kind from real or personal property. Where net family assets are in excess of $5,000, annual income shall include the greater of actual income derived from net family assets or a percentage of the value of such assets based on the current passbook savings rate, as determined by HUD.</td>
                                                    <td>
                                                
                                                        <input disabled value={this.state.data.investments} />
                                                        
                                                    
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>7</td>
                                                    <td>Pay and allowances of a member of the armed forces.</td>
                                                    <td>Include all regular pay, special pay and allowances of a member of the Armed Forces (except Hostile Fire Pay).</td>
                                                    <td>
                                                
                                                        <input disabled value={this.state.data.armedForcesPay} />
                                                        
                                                    
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>8</td>
                                                    <td>Public assistance received.</td>
                                                    <td>Public Assistance, including cash payments made to household members under other programs funded, separately or jointly, by federal, state, or local governments which are not excluded by Federal Statutes. Includes cash payments to household members made by the HIV/AIDS Services Administration (HASA).</td>
                                                    <td>
                                                
                                                        <input disabled value={this.state.data.publicAssistanceRecieved} />
                                                        
                                                    
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>9</td>
                                                    <td>In the consumer / household solely dependent on Public Assistance?</td>
                                                    <td>If houseshold solely receives income from public assistance, tenant rent contribution shall equal $0.</td>
                                                    <td>
                                                    <input type="radio" disabled   checked={this.state.data.welfareReliant === true}  ></input>Yes
                            

                                                    <br></br>
                                                    <input type="radio" disabled checked={this.state.data.welfareReliant === false}  ></input>No
                                                    
                                                    </td>
                                                </tr>
                                                
                                            </tbody>


                                    </table>
                    
                    <lable sm="6" size="mb" htmlFor="input-large">Annual Gross Income</lable>
                    <input Style="margin:10px" disabled value={this.state.data.annualGrossIncome}/>
                    <br></br>
                    <lable sm="6" size="mb" htmlFor="input-large">Monthly Gross Income</lable>
                    <input  Style="margin:10px" disabled value={this.state.data.monthlyGrossIncome}  />
                </div>
                <div>
                    <h1 align="center">Monetary Allowances</h1>
                    <table border="2" cellPadding="10px">
                                    <thead>
                                        <tr>
                                            <th width="5%">SNo.</th>
                                            <th>Question</th>
                                            <th>Description</th>
                                            <th width="15%">Response</th>
                                        </tr>
                                    </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Number of dependents in the household.</td>
                                                <td>Dependents include household members under the age of 18, elderly dependents, handicapped, disabled, or full-time students, but not the family head of household, spouse or foster children.</td>
                                                <td>
                                                    <input disabled value={this.state.data.numDependents}  />
                                                </td>   
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>$400 for elderly or disabled family member.</td>
                                                <td>This $400 deduction always applies to households with persons with HIV or AIDS if they are the head/co-head, spouse, or sole member, OR when the head/co-head, spouse, or sole member is at least 62 years of age. ($400 is given one time only at each calculation and/or re-calculation of income.)</td>
                                                <td>
                                                <input type="radio" disabled  checked={this.state.data.disabledDeduction===400}></input>Yes
                                                <br></br>
                                                <input type="radio" disabled checked={this.state.data.disabledDeduction===0}></input>No
                                               
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Resonable childcare expenses annually.</td>
                                                <td>These are expenses anticipated during the year for children 12 years of age or younger that enable a household member to work, seek employment, or to further their education. Deductible expenses for childcare to enable a person to work shall not exceed the amount of income received from such work. Childcare cannot be paid to another member of the household. (ONLY EXPENSES NOT REIMBURSED FROM ANY OTHER SOURCES ARE ALLOWED)</td>
                                                <td>
                                              
                                                    <input  disabled value={this.state.data.childcareExp} ></input>
                                             
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>Attendant care expenses fro non-elderly, disabled family members.</td>
                                                <td>This allowance covers reasonable expenses anticipated during the period for attendant care (provided by a non-household member) and/or auxiliary apparatus for any disabled household member that enables that person or any other household member to work. Deduction may not exceed the amount of income generated by the person enabled to work. (ONLY EXPENSES NOT REIMBURSED FROM ANY OTHER SOURCES ARE ALLOWED.)
                                                </td>
                                                <td>
                                               
                                                    <input  disabled value={this.state.data.attendExp}/>
                                                
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>Medical expenses and/or assistance for elderly or disabled family members.</td>
                                                <td>(ONLY EXPENSES NOT REIMBURSED FROM ANY OTHER SOURCES ARE ALLOWED.)</td>
                                                <td>
                                             
                                                    <input  disabled value={this.state.data.elderlyExp} />
                                                  
                                                </td>
                                            </tr>
                                         </tbody>
                                </table>
                    <label  sm="6" size="mb" htmlFor="input-large">Total Non-Reimbursed Medical Expenses</label>
                    <input Style="margin:10px" disabled value={this.state.data.medExp}/>
                    <br></br>
                    <label  sm="6" size="mb" htmlFor="input-large">3% of Annual Gross Income</label>
                    <input Style="margin:10px" disabled value={this.state.data.perAGI} />
                </div>
                <div>
                    <h1 align="center">Earned Income Disregard</h1>
                    <table border="2" cellPadding="10px">
                                    <thead>
                                        <tr>
                                            <th width="5%">SNo.</th>
                                            <th>Question</th>
                                            <th>Description</th>
                                            <th width="15%">Response</th>
                                        </tr>
                                    </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Is a member of the household receiving assistance through HOPWA, SHP, HOME, or Section 8?</td>
                                                <td></td>
                                                <td>
                                                <input type="radio" disabled  checked={this.state.data.inHOPWA===true}></input>Yes
                                                <br></br>
                                                <input type="radio" disabled checked={this.state.data.inHOPWA===false}></input>No
                                                </td>   
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Household earned income increased as a result of employment, after a period of unemployment of one or more years prior to employment?</td>
                                                <td>For local minimum wage: <a href="https://www.dol.gov/whd/minwage/america.htm">https://www.dol.gov/whd/minwage/america.htm</a></td>
                                                <td>
                                                <input type="radio" disabled  checked={this.state.data.employmentIncomeIncrease===true}></input>Yes
                                                <br></br>
                                                <input type="radio" disabled checked={this.state.data.employmentIncomeIncrease===false}></input>No
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Household earned income increased as a result of participation in an economic self-sufficiency program or other job-training program?</td>
                                                <td></td>
                                                <td>
                                                <input type="radio" disabled checked={this.state.data.selfSufficientIncome===true}></input>Yes
                                                <br></br>
                                                <input type="radio" disabled checked={this.state.data.selfSufficientIncome===false}></input>No
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>Household's earned income increases as a result of employment during or within six (6) months after receiving assistance, benefits, or services under TANF or a Welfare-to-Work program?</td>
                                                <td>This includes a one time only cash assistance of at least $500.</td>
                                                <td>
                                                <input type="radio" disabled checked={this.state.data.incomeWSixMo===true}></input>Yes
                                                <br></br>
                                                <input type="radio" disabled checked={this.state.data.incomeWSixMo===false}></input>No
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>Effective date of increase in earned income</td>
                                                <td></td>
                                                <td>
                                             
                                                    {/* <Input type="date"  placeholder="date" onChange={this.field5Change}/> */}
                                                 
                                                
                                                   <label>{this.state.data.incomeIncreaseDate }</label>
                                                
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>Pre-Qualifying/Baseline Income</td>
                                                <td>Enter the total income including earned and unearned, prior to qualifying event for the EID family member.</td>
                                                <td>
                                           
                                                    <input disabled value={this.state.data.baselineIncome}  />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td>Current earned (employment) income of EID family member</td>
                                                <td></td>
                                                <td>
                                              
                                                    <input  disabled value={this.state.data.incomeEID}  />
                                              
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>8</td>
                                                <td>Other current income of EID family member</td>
                                                <td></td>
                                                <td>
                                                {/* className="border border-dark" */}
                                               
                                                    <input    disabled value={this.state.data.otherIncomeEID}  />
                                         
                                                </td>
                                            </tr>
                                          
                                            
                                        </tbody>


                                </table>
                    <label sm="6" size="mb" htmlFor="input-large">Applicable Earned Income Disregard</label>
                    <input Style="margin:10px" disabled value={this.state.data.applicableEID}/>
                            
                </div>
                <div>
                    <h1 align="center">Review Adjusted Income</h1>
                    <table align="center" border="2" cellPadding="10px">
                               
                        <tbody>
                            <tr>
                                <th>Annual Gross Income</th>
                                <td>
                                    <input disabled value={this.state.data.annualGrossIncome}></input>
                                </td>
                                
                                <td>
                                <button   className="success extrasp" value="Review">Review </button>
                                </td>
                            </tr>
                            <tr>
                                <th>Total Allowances</th>
                                <td>
                                    <input disabled value={this.state.data.totalAllowance}></input>
                                </td>
                                
                                <td>
                                <button className="success extrasp" value="Review">Review </button>
                                </td>
                            </tr>
                            <tr>
                                <th>Annual Adjusted Income</th>
                                <td>
                                    <input disabled value={this.state.data.annualAdjustedIncome}></input>
                                </td>
                                
                                <td>
                                <button   className="success extrasp" value="Review">Review </button>
                                </td>
                            </tr>
                            <tr>
                                <th>Monthly Adjusted Income</th>
                                <td>
                                    <input disabled value={this.state.data.monthlyAdjustedIncome}></input>
                                </td>
                                
                                <td>
                                <button  className="success extrasp" value="Review">Review </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h1 align="center">Results</h1>
                    <table align="center" border="2" cellPadding="10px">
                                <thead>
                                    <tr>
                                        <th width="5%">SNo.</th>
                                        <th>Question</th>
                                        <th>Description</th>
                                        <th width="15%">Response</th>
                                    </tr>
                                </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Total monthly rent per current lease agreement</td>
                                            <td></td>
                                            <td>
                                            
                                                <input disabled value={this.state.data.totalMontlyRent} />
                                                
                                            
                                            </td>   
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Current lease period (in months)</td>
                                            <td>Specify the current lease period in months: e.g. 12 months, 24 months, etc</td>
                                            <td>
                                            
                                                <input disabled value={this.state.data.currentLeasePeriod} />
                                                
                                            
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Are utilities included in the rent?</td>
                                            <td></td>
                                            <td>
                                            <input type="radio" disabled  checked={this.state.data.utilitiesIncluded===true}></input>Yes
                                            <br></br>
                                            <input type="radio" disabled checked={this.state.data.utilitiesIncluded===false}></input>No
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>Utility allowance</td>
                                            <td>A tenant is only eligible for a utility allowance if utilities are NOT included in the rent charge. Copies of HUD-approved utility allowance charts may be obtained from local Housing Authorities and are updated periodically. </td>
                                            <td>
                                    
                                                <input disabled value={this.state.data.utilityAllowance}/>
                                                
                                            
                                            </td>
                                        </tr>
                                        
                                    
                                        
                                    </tbody>


                            </table>
                               
                    <label sm="6"  size="mb" htmlFor="input-large">Tenant Rent Responsibility</label>
                
                    <input Style="margin:10px" disabled value={this.state.data.tenantRentResponsibility} />
                    <br></br>
                            
                    <label sm="6"  size="mb" htmlFor="input-large">Rent Subsidy Payment</label>
                    
                    <input Style="margin:10px" disabled value={this.state.data.rentSubsidyPayment} />
                                        

                </div>
               
            </div>
        )
    }
}

export default Result