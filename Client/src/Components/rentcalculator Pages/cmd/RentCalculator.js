import React, { Component } from 'react'

var num1 = 0;
var num2 = 0;
var num3 = 0;
var num4 = 0;
var num5 = 0;
var num6 = 0;
var num7 = 0;
var num8 = 0;
var num9 = 0;
var num10 = 0;
var num11 = 0;
var num12 = 0;
var num13 = 0;
var num14 = 0;
var num15 = 0;
  var num16 = 0;
  var num17 = 0;
  var num18 = 0;
  var num19 = 0;
  var num20 = 0;
  var num21 = 0;
  var num22=0
  var num23=0
  var num24=0
  var num24=0
  var num25=0
  var num26=0
  var num27=0
  var nameinHOPWA="false"
  var nameemploymentIncomeIncrease="false"
  var nameselfSufficientIncome="false"
  var nameincomeWSixMo="false"

 class RentCalculator extends Component {
    constructor(props) {
        console.log('dd')
        super(props);
        this.saveAndContinue = this.saveAndContinue.bind(this)
        this.backButton = this.backButton.bind(this)
        this.backSteps = this.backSteps.bind(this)
        this.state = {
          //  clientId:this.props.match.params.id?this.props.match.params.id:0,
            errorMessage: "",
            annualGrossIncome:0,
            monthlyGrossIncome:0,
            annualHouseHoldWages:0,
            periodicPayment:0,
            unearnedIncome:0,
            receivedIncome:0,
            businessIncome:0,
            investments:0,
            armedForcesPay:0,
            publicAssistanceReceived:0,
            welfareReliant:"false",
            step: 1,
            userId:4,
            numDependents:"false",
            disabledDeduction:400,
            childcareExp:0,
            attendExp:0,
            elderlyExp:0,
            medExp:0,
            perAGI:0,
            medDeduction:0,
            inHOPWA:"false",
            employmentIncomeIncrease:"false",
            selfSufficientIncome:"false",
            incomeWSixMo:"false",
            incomeIncreaseDate:new Date(),
            baselineIncome:0,
            incomeEID:0,
            otherIncomeEID:0,
            applicableEID:0,
            totalMontlyRent:0,
            currentLeasePeriod:0,
            utilitiesIncluded:"false",
            utilityAllowance:0,
            tenantRentResponsibility:0,
            rentSubsidyPayment:0,
           // annualGrossIncome:this.props.annualGrossIncome,
        
        };
    
  //  console.log(this.state)    

    }



    
    sumField(){
        num9=Number(num1)+Number(num2)+Number(num3)+Number(num4)+Number(num5)+Number(num6)+Number(num7)+Number(num8)
        console.log(num9)
        this.setState({
            annualGrossIncome: num9,
            monthlyGrossIncome:Number((Math.round((num9/12) * 100) / 100).toFixed(2))
           
             })
    }

    backButton = (e) =>{
        console.log("back")
        this.previousStep()
    }
    backSteps = (Stepsno) =>{
        console.log(Stepsno)
        this.setState({
            step : Stepsno
          })
        
    }
    annualHouseHoldWagesChange = (e) => {
        num1=e.target.value
        this.setState({
            annualHouseHoldWages: Number(e.target.value),
           
             })
        this.sumField()     
    }
    periodicPaymentChange = (e) => {
        num2=e.target.value
        this.setState({
            periodicPayment: Number(e.target.value),
           
            })
        this.sumField()  
    }
    unearnedIncomeChange = (e) => {
        num3=e.target.value
        this.setState({
            unearnedIncome: Number(e.target.value),
            })
            this.sumField() 
    }
    receivedIncomeChange = (e) => {
        num4=e.target.value
        this.setState({
            receivedIncome: Number(e.target.value),
            })
            this.sumField() 
    }
    businessIncomeChange = (e) => {
        num5=e.target.value
        this.setState({
            businessIncome: Number(e.target.value),
            })
            this.sumField() 
    }
    investmentsChange = (e) => {
        num6=e.target.value
        this.setState({
            investments: Number(e.target.value),
            })
            this.sumField() 
    }
    armedForcesPayChange = (e) => {
        num7=e.target.value
        this.setState({
            armedForcesPay: Number(e.target.value),
            })
            this.sumField() 
    }
    publicAssistanceReceivedChange = (e) => {
        num8=e.target.value
        this.setState({
            publicAssistanceReceived:Number(e.target.value),
            })
            this.sumField() 
    }
    welfareReliantChange = (e) => {
        this.setState({
            welfareReliant: e.target.value
            })
            
          
    }
    saveAndContinue= (e) =>{
        
        if( this.state.step === 1){
            console.log(e)
            this.setState({
                annualGrossIncome:e.annualGrossIncome,
                monthlyGrossIncome:e.monthlyGrossIncome,
                annualHouseHoldWages:e.annualHouseHoldWages,
                periodicPayment:e.periodicPayment,
                unearnedIncome:e.unearnedIncome,
                receivedIncome:e.receivedIncome,
                businessIncome:e.businessIncome,
                investments:e.investments,
                armedForcesPay:e.armedForcesPay,
                publicAssistanceReceived:e.publicAssistanceReceived,
                welfareReliant:e.welfareReliant,
                perAGI:Number(Math.round((e.annualGrossIncome*.3)).toFixed(2)),
             })
            this.nextStep()
        }else if(this.state.step === 2){
            this.setState({
                numDependents:e.numDependents,
                disabledDeduction:e.disabledDeduction,
                childcareExp:e.childcareExp,
                attendExp:e.attendExp,
                elderlyExp:e.elderlyExp,
                medExp:e.medExp,
                perAGI:e.perAGI,
                medDeduction:e.medDeduction,
             })
            this.nextStep()
        }else if(this.state.step === 3){
            this.setState({
                inHOPWA:e.inHOPWA,
                employmentIncomeIncrease:e.employmentIncomeIncrease,
                selfSufficientIncome:e.selfSufficientIncome,
                incomeWSixMo:e.incomeWSixMo,
                incomeIncreaseDate:e.incomeIncreaseDate,
                baselineIncome:e.baselineIncome,
                incomeEID:e.incomeEID,
                otherIncomeEID:e.otherIncomeEID,
                applicableEID:e.applicableEID,
             })
           
             this.nextStep()
        }else if(this.state.step === 4){
            this.setState({
                    totalAllowance:e.totalAllowance,
                    annualAdjustedIncome:e.annualAdjustedIncome,
                    monthlyAdjustedIncome:e.monthlyAdjustedIncome,
                })

            this.nextStep()
        }else if(this.state.step === 5){
            this.setState({
                totalMontlyRent:e.totalMontlyRent,
                currentLeasePeriod:e.currentLeasePeriod,
                utilitiesIncluded:e.utilitiesIncluded,
                utilityAllowance:e.utilityAllowance,
                tenantRentResponsibility:e.tenantRentResponsibility,
                rentSubsidyPayment:e.rentSubsidyPayment,
            })
            
            this.nextStep()

        }

       
       
      }
   
      nextStep() {
         // console.log(this.state)
          num19=((Number(this.state.numDependents)*480)+Number(this.state.disabledDeduction)+Number(this.state.childcareExp)+
          Number(this.state.medDeduction)+Number(this.state.applicableEID))
          num20=Number(this.state.annualGrossIncome)-Number(num19)
          num21=Math.round(num20/12).toFixed()
          num24=Number(Math.round(Number(this.props.monthlyAdjustedIncome)*.03).toFixed())
          num25=Number(Math.round(Number(this.props.monthlyGrossIncome)*.01).toFixed())
          if(this.props.welfareReliant==="true" && this.props.publicAssistanceRecieved!=0 || this.props.publicAssistanceRecieved!=""){
              if(num24>num25){
                  num26=Number(num24)
              }else{
                  num26=Number(num25)  
              }
          }
          if(this.state.step===3){
             nameinHOPWA="false"
             nameemploymentIncomeIncrease="false"
             nameselfSufficientIncome="false"
             nameincomeWSixMo="false"
          }else{
            nameinHOPWA=this.state.inHOPWA
            nameemploymentIncomeIncrease=this.state.employmentIncomeIncrease
            nameselfSufficientIncome=this.state.selfSufficientIncome
            nameincomeWSixMo=this.state.incomeWSixMo
          }


        this.setState({
          step : this.state.step + 1,
          annualGrossIncome:this.state.annualGrossIncome,
          monthlyGrossIncome:this.state.monthlyGrossIncome,
          annualHouseHoldWages:this.state.annualHouseHoldWages,
          periodicPayment:this.state.periodicPayment,
          unearnedIncome:this.state.unearnedIncome,
          receivedIncome:this.state.receivedIncome,
          businessIncome:this.state.businessIncome,
          investments:this.state.investments,
          armedForcesPay:this.state.armedForcesPay,
          publicAssistanceReceived:this.state.publicAssistanceReceived,
          welfareReliant:this.state.welfareReliant,
          perAGI:Number(Math.round((this.state.annualGrossIncome*.3)).toFixed(2)),
          numDependents:this.state.numDependents,
          disabledDeduction:this.state.disabledDeduction,
          childcareExp:this.state.childcareExp,
          attendExp:this.state.attendExp,
          elderlyExp:this.state.elderlyExp,
          medExp:this.state.medExp,
          medDeduction:this.state.medDeduction,
          inHOPWA:nameinHOPWA,
          employmentIncomeIncrease:nameemploymentIncomeIncrease,
          selfSufficientIncome:nameselfSufficientIncome,
          incomeWSixMo:nameincomeWSixMo,
          incomeIncreaseDate:this.state.incomeIncreaseDate,
          baselineIncome:this.state.baselineIncome,
          incomeEID:this.state.incomeEID,
          otherIncomeEID:this.state.otherIncomeEID,
          applicableEID:this.state.applicableEID,
         // annualGrossIncome:this.props.annualGrossIncome,
            totalAllowance:num19,
            annualAdjustedIncome:num20,
            monthlyAdjustedIncome:num21,
            totalMontlyRent:this.state.totalMontlyRent,
            currentLeasePeriod:this.state.currentLeasePeriod,
            utilitiesIncluded:this.state.utilitiesIncluded,
            utilityAllowance:this.state.utilityAllowance,
            tenantRentResponsibility:Number(num26),
            rentSubsidyPayment:this.state.rentSubsidyPayment,
            clientid:1,
        })
      
      }
      
      // Same as nextStep, but decrementing
      previousStep() {
        this.setState({
          step : this.state.step - 1
        })
      }

      sumField2(){
        num14=Number(num10)+Number(num11)
        console.log(num14)
        this.setState({
            medExp: Number(num14),
            // monthlyGrossIncome:(Math.round((num14/12) * 100) / 100).toFixed(2)
           
             })
        num13=Number(this.state.perAGI)-Number(num14)
        console.log(num13)
        if(num13<0){
            this.setState({
                medDeduction: 0,
                })

        }else{
            this.setState({
                medDeduction: Number(num13),
                })
        }
    }
  
    numDependentsChange = (e) => {
       this.setState({
            numDependents: Number(e.target.value),
            })
    }
    disabledDeductionChange = (e) => {
        if(e.target.value=="false"){
            this.setState({
                disabledDeduction: 0,
             })

        }else{
            this.setState({
                disabledDeduction: 400,
             })
        }

        
    }
    childcareExpChange = (e) => {
       
        this.setState({
            childcareExp: Number(e.target.value),
           
             })
    }
    attendExpChange = (e) => {
        num10=e.target.value
        this.setState({
            attendExp: Number(e.target.value),
           
             })
             this.sumField2()
    }
    elderlyExpChange = (e) => {
        num11=e.target.value
        this.setState({
            elderlyExp: Number(e.target.value),
           
             })
             this.sumField2()
    }
    //step 3
    inHOPWAChange = (e) => {
        console.log(e)

        this.setState({inHOPWA: e.target.value,})
        console.log(this.state)
     }
     employmentIncomeIncreaseChange = (e) => {
         this.setState({employmentIncomeIncrease: e.target.value,})
     }
     selfSufficientIncomeChange = (e) => {
         this.setState({ selfSufficientIncome: e.target.value, })
     }
     incomeWSixMoChange = (e) => {
        
         this.setState({ incomeWSixMo: e.target.value, })
        
     }
    
     incomeIncreaseDateChange = date => {
        // console.log(date.target.value)
        this.setState({
            incomeIncreaseDate: date.target.value,

        });
      };

     baselineIncomeChange = (e) => {
        num15=e.target.value
        this.setState({baselineIncome: Number(e.target.value), })
        this.sumField3()
    }
    incomeEIDChange = (e) => {
        num16=e.target.value
        this.setState({incomeEID: Number(e.target.value), })
        this.sumField3()
    }
    otherIncomeEIDChange = (e) => {
        num17=e.target.value
        this.setState({otherIncomeEID: Number(e.target.value), })
        this.sumField3()
    }
    applicableEIDChange = (e) => {
     //   num18=e.target.value
        this.setState({applicableEID: Number(e.target.value), })
      
    }
    sumField3(){
        num18=(Number(num16)+Number(num17))-Number(num15)
        this.setState({applicableEID: Number(num18), })

    }

    backStepsbutton=(e)=>{
        console.log(e)
      this.backSteps(e)
    }

    totalcal(){
        console.log(num22,num23);
        num24=Number(num22)-Number(num23)
        this.setState({ rentSubsidyPayment: Number(num24), })
    }

    totalMonthlyRentChange = (e) => {
        num22=e.target.value
        this.setState({totalMonthlyRent: Number(e.target.value),})
        this.totalcal();
     }
     currentLeasePeriodChange = (e) => {
       
         this.setState({currentLeasePeriod: Number(e.target.value),})
         this.totalcal();
     }
     utilitiesIncludedChange = (e) => {
         this.setState({ utilitiesIncluded: e.target.value, })
         this.checkIsyes(this.state.utilityAllowance);
     }
     checkIsyes(field){
         console.log(this.state.utilitiesIncluded)
         if(this.state.utilitiesIncluded==="false"){
            this.setState({
                tenantRentResponsibility:Number(num27)+Number(field)
            })


         }

     }
     utilityAllowanceChange = (e) => {
        num23=e.target.value
         this.setState({ utilityAllowance: Number(e.target.value), })
         this.checkIsyes(e.target.value);
         this.totalcal();
     }
     tenantRentResponsibilityChange = (e) => {
        num23=e.target.value
        this.setState({ tenantRentResponsibility: Number(e.target.value), })
     
     }
     rentSubsidyPaymentChange = (e) => {
        this.setState({ rentSubsidyPayment: Number(e.target.value), })
     }


    render() {


        
       console.log(this.state)
       if(this.state.step==6){
        var request = new XMLHttpRequest();
        request.open("POST", "http://localhost:8500/rentcalculator/index.cfm/worksheet",false);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(this.state));
        const resultdata=JSON.parse(request.responseText);
        if(resultdata.status===true){
            alert("data saved")
        }else{
            alert("error")
        }
    }



        switch (this.state.step) {
			case 1:
                return (
                    <div align="center">
                   
                                    <h1>Gross Annual Household Income</h1>
                             
                               
                                { 
                                  this.state.errorMessage?
                                
                                    <div className="primary">
                                        {
                                          this.state.errorMessage &&
                                          this.state.errorMessage
                                        }
                                    </div>
                                
                                  :null
                                }
                                    <form >
                                        <table >
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
                                                       
                                                            <input  min={0} max={100}  onChange={this.annualHouseHoldWagesChange} />
                                                        
                                                        </td>   
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>Periodic payments: e.g. social security, retirement funds, annuities, etc.</td>
                                                        <td>Include periodic payments from Social Security, annuities, insurance policies, retirement funds, pensions, disability or death benefits, excluding lump sum payments for the delayed start of a periodic payment. ALL INCOME MUST BE ANNUALIZED.</td>
                                                        <td>
                                                       
                                                            <input placeholder=""   onChange={this.periodicPaymentChange} />
                                                            
                                                        
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>Additional payments: e.g. unemployments, disability, worker's compensation, etc.</td>
                                                        <td>Include unemployment, disability, worker's compensation, and severance pay.</td>
                                                        <td>
                                                       
                                                            <input placeholder=""   onChange={this.unearnedIncomeChange} />
                                                            
                                                        
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>Alimony, child support</td>
                                                        <td>Periodic payments received including alimony and child support, and regular contributions or gifts received from organizations or persons (including family members) not residing in the household.</td>
                                                        <td>
                                                       
                                                            <input placeholder=""   onChange={this.receivedIncomeChange} />
                                                            
                                                        
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>Net income from operation of a business profession</td>
                                                        <td>Net income from operation of a business or profession (including but NOT limited to hairbraiding, day labor work, etc.).</td>
                                                        <td>
                                                       
                                                            <input placeholder=""   onChange={this.businessIncomeChange} />
                                                            
                                                        
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>6</td>
                                                        <td>Investments and rental income in excess of $5,000 per year</td>
                                                        <td>Interest, dividends, and other net income of any kind from real or personal property. Where net family assets are in excess of $5,000, annual income shall include the greater of actual income derived from net family assets or a percentage of the value of such assets based on the current passbook savings rate, as determined by HUD.</td>
                                                        <td>
                                                       
                                                            <input placeholder=""   onChange={this.investmentsChange} />
                                                            
                                                        
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>7</td>
                                                        <td>Pay and allowances of a member of the armed forces.</td>
                                                        <td>Include all regular pay, special pay and allowances of a member of the Armed Forces (except Hostile Fire Pay).</td>
                                                        <td>
                                                       
                                                            <input placeholder=""  onChange={this.armedForcesPayChange} />
                                                            
                                                        
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>8</td>
                                                        <td>Public assistance received.</td>
                                                        <td>Public Assistance, including cash payments made to household members under other programs funded, separately or jointly, by federal, state, or local governments which are not excluded by Federal Statutes. Includes cash payments to household members made by the HIV/AIDS Services Administration (HASA).</td>
                                                        <td>
                                                       
                                                            <input placeholder=""   onChange={this.publicAssistanceReceivedChange} />
                                                            
                                                        
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>9</td>
                                                        <td>In the consumer / household solely dependent on Public Assistance?</td>
                                                        <td>If houseshold solely receives income from public assistance, tenant rent contribution shall equal $0.</td>
                                                        <td>
                                                        <input type="radio" value={true}   checked={this.state.welfareReliant === "true"}  onChange={this.welfareReliantChange}></input>Yes
                                
        
                                                        <br></br>
                                                        <input type="radio" value={false} checked={this.state.welfareReliant === "false"}  onChange={this.welfareReliantChange}></input>No
                                                        
                                                        </td>
                                                    </tr>
                                                    
                                                </tbody>
        
        
                                        </table>
                                       
                                                Annual Gross Income
                                              
                                               
                                                            <input value={this.state.annualGrossIncome} />
                                                            
                                                        
                                                
                                              Monthly Gross Income
                                               
                                               
                                                            <input value={this.state.monthlyGrossIncome}  />
                                                        
                                        <div>
                                            <button type="button" size="md" color="success extrasp"
                                            onClick={this.saveAndContinue} className="float-right" >
                                                <i className="fa fa-dot-circle-o"></i>Next
                                            </button>
                                            <button type="button" size="md" color="success extrasp" className="float-right"
                                             onClick={() => {  this.props.history.push("");}}  >
                                                <i className="fa fa-dot-circle-o"></i>Back
                                            </button>
                                            </div>
                                        <div>
                                            <div>25% Done </div> 
                                            </div>
                                    </form>
                               
                             
                        
                    </div>
              
                )
            case 2:
                return (
                    <div aling="center">
                 
                                    <h1>Monetary Allowances</h1>
                               
                                    <form>
                                        <table >
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
                                                        
                                                            <input onChange={this.numDependentsChange}  />
                                                            
                                                        
        
                                                        </td>   
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>$400 for elderly or disabled family member.</td>
                                                        <td>This $400 deduction always applies to households with persons with HIV or AIDS if they are the head/co-head, spouse, or sole member, OR when the head/co-head, spouse, or sole member is at least 62 years of age. ($400 is given one time only at each calculation and/or re-calculation of income.)</td>
                                                        <td>
                                                        <input type="radio"  value="true"  onChange={this.disabledDeductionChange} checked={this.state.disabledDeduction===400}></input>Yes
                                                        <br></br>
                                                        <input type="radio"  value="false"  onChange={this.disabledDeductionChange} checked={this.state.disabledDeduction===0}></input>No
                                                       
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>Resonable childcare expenses annually.</td>
                                                        <td>These are expenses anticipated during the year for children 12 years of age or younger that enable a household member to work, seek employment, or to further their education. Deductible expenses for childcare to enable a person to work shall not exceed the amount of income received from such work. Childcare cannot be paid to another member of the household. (ONLY EXPENSES NOT REIMBURSED FROM ANY OTHER SOURCES ARE ALLOWED)</td>
                                                        <td>
                                                       
                                                            <input  onChange={this.childcareExpChange}/>
                                                            
                                                        
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>Attendant care expenses fro non-elderly, disabled family members.</td>
                                                        <td>This allowance covers reasonable expenses anticipated during the period for attendant care (provided by a non-household member) and/or auxiliary apparatus for any disabled household member that enables that person or any other household member to work. Deduction may not exceed the amount of income generated by the person enabled to work. (ONLY EXPENSES NOT REIMBURSED FROM ANY OTHER SOURCES ARE ALLOWED.)
                                                        </td>
                                                        <td>
                                                       
                                                            <input onChange={this.attendExpChange}/>
                                                            
                                                        
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>Medical expenses and/or assistance for elderly or disabled family members.</td>
                                                        <td>(ONLY EXPENSES NOT REIMBURSED FROM ANY OTHER SOURCES ARE ALLOWED.)</td>
                                                        <td>
                                                       
                                                            <input onChange={this.elderlyExpChange} />
                                                            
                                                        
                                                        </td>
                                                    </tr>
                                                 </tbody>
                                        </table>
                                       
                                                <label sm="6" size="mb" htmlFor="input-large">Total Non-Reimbursed Medical Expenses</label>
                                                
                                               
                                                            <input value={this.state.medExp} onChange={this.field6Change}/>
                                                            
                                                        
                                                
                                           
                                                <label sm="6" size="mb" htmlFor="input-large">3% of Annual Gross Income</label>
                                               
                                                            <input placeholder="Monthly Gross Income" value={this.state.perAGI} />
                                                    
                                                <label sm="6" size="mb" htmlFor="input-large">Total Allowable Medical Expense Deduction</label>
                                                
                                               
                                                            <input placeholder="Monthly Gross Income" value={this.state.medDeduction} />
                                                        
                                        <div>
                                            <button type="button" size="md" color="success extrasp"
                                             onClick={this.saveAndContinue} className="float-right" >
                                                <i className="fa fa-dot-circle-o"></i>Next
                                            </button>
                                            <button type="button" size="md" color="success extrasp" className="float-right"
                                             onClick={this.backbutton}  >
                                                <i className="fa fa-dot-circle-o"></i>Back
                                            </button>
                                            </div>
                                        <div>
                                             29% Done 
                                            </div>
                                    </form>
                               
                        
                    </div>
              
                )
            case 3:
                return (
                    <div className="animated fadeIn">
             
                                <h1>Earned Income Disregard</h1>
                    
                                <form>
                                    <table >
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
                                                        <input type="radio" value={true}   checked={this.state.inHOPWA === "1"}  onChange={this.inHOPWAChange}></input>Yes
                                                        <br></br>
                                                        <input type="radio" value={false} checked={this.state.inHOPWA === "0"}  onChange={this.inHOPWAChange}></input>No
                                                        

                                                    {/* <input type="radio" value={true}  onChange={this.inHOPWAChange} checked={this.state.inHOPWA==="true"}></input>Yes
                                                    <br></br>
                                                    <input type="radio" value={false}  onChange={this.inHOPWAChange} checked={this.state.inHOPWA==="false"}></input>No
                                                    */}
                                                    </td>   
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Household earned income increased as a result of employment, after a period of unemployment of one or more years prior to employment?</td>
                                                    <td>For local minimum wage: <a href="https://www.dol.gov/whd/minwage/america.htm">https://www.dol.gov/whd/minwage/america.htm</a></td>
                                                    <td>
                                                    <input type="radio" value={true}  onChange={this.employmentIncomeIncreaseChange} checked={this.state.employmentIncomeIncrease==="true"}></input>Yes
                                                    <br></br>
                                                    <input type="radio" value={false}  onChange={this.employmentIncomeIncreaseChange} checked={this.state.employmentIncomeIncrease==="false"}></input>No
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>Household earned income increased as a result of participation in an economic self-sufficiency program or other job-training program?</td>
                                                    <td></td>
                                                    <td>
                                                    <input type="radio" value={true}  onChange={this.selfSufficientIncomeChange} checked={this.state.selfSufficientIncome==="true"}></input>Yes
                                                    <br></br>
                                                    <input type="radio" value={false}  onChange={this.selfSufficientIncomeChange} checked={this.state.selfSufficientIncome==="false"}></input>No
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td>Household's earned income increases as a result of employment during or within six (6) months after receiving assistance, benefits, or services under TANF or a Welfare-to-Work program?</td>
                                                    <td>This includes a one time only cash assistance of at least $500.</td>
                                                    <td>
                                                    <input type="radio" value={true}  onChange={this.incomeWSixMoChange} checked={this.state.incomeWSixMo==="true"}></input>Yes
                                                    <br></br>
                                                    <input type="radio" value={false}  onChange={this.incomeWSixMoChange} checked={this.state.incomeWSixMo==="false"}></input>No
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>5</td>
                                                    <td>Effective date of increase in earned income</td>
                                                    <td></td>
                                                    <td>
                                                 
                                                        {/* <input type="date"  placeholder="date" onChange={this.incomeIncreaseDateChange}/> */}
                                                     
                                                      
                                                        <input type="date" selected={this.state.incomeIncreaseDate}      onChange={this.incomeIncreaseDateChange}/>
    
                                                       
                                                    
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>6</td>
                                                    <td>Pre-Qualifying/Baseline Income</td>
                                                    <td>Enter the total income including earned and unearned, prior to qualifying event for the EID family member.</td>
                                                    <td>
                                                  
                                                        <input placeholder="" onChange={this.baselineIncomeChange}  />
                                                        
                                                    
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>7</td>
                                                    <td>Current earned (employment) income of EID family member</td>
                                                    <td></td>
                                                    <td>
                                                  
                                                        <input onChange={this.incomeEIDChange}  />
                                                        
                                                    
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>8</td>
                                                    <td>Other current income of EID family member</td>
                                                    <td></td>
                                                    <td>
                                                    {/* className="border border-dark" */}
                                                    
                                                        <input   onChange={this.otherIncomeEIDChange} />
                                                        
                                                    
                                                    </td>
                                                </tr>
                                              
                                                
                                            </tbody>
    
    
                                    </table>
                                  
                                            <label sm="6" size="mb" htmlFor="input-large">Applicable Earned Income Disregard</label>
                                           
                                          
                                                        <input value={this.state.applicableEID}/>
                                                        
                                           
                                       
                                    <div>
                                        <button type="button" size="md" color="success extrasp"
                                        onClick={this.saveAndContinue}  className="float-right" >
                                            <i className="fa fa-dot-circle-o"></i>Next
                                        </button>
                                        <button type="button" size="md" color="success extrasp" className="float-right"
                                         onClick={this.backbutton}  >
                                            <i className="fa fa-dot-circle-o"></i>Back
                                        </button>
                                        </div>
                                    <div>
                                         50% Done 
                                        </div>
                                </form>
                          
                    
                </div>
          
            )
            case 4:
                return (
                    <div className="animated fadeIn">
                  
                                <h1>Review Adjusted Income</h1>
                               
                                <table >
                               
                               <tbody>
                                   <tr>
                                       <th>Annual Gross Income</th>
                                       <td>
                                           <input disabled value={this.state.annualGrossIncome}></input>
                                       </td>
                                      
                                       <td>
                                        <button type="button" onClick={() => this.backStepsbutton(1)} className="success extrasp" value="Review">Review </button>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th>Total Allowances</th>
                                       <td>
                                           <input disabled value={this.state.totalAllowance}></input>
                                       </td>
                                      
                                       <td>
                                       <button type="button" onClick={() => this.backStepsbutton(2)} className="success extrasp" value="Review">Review </button>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th>Annual Adjusted Income</th>
                                       <td>
                                           <input disabled value={this.state.annualAdjustedIncome}></input>
                                       </td>
                                      
                                       <td>
                                        <button type="button" onClick={() => this.backStepsbutton(3)} className="success extrasp" value="Review">Review </button>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th>Monthly Adjusted Income</th>
                                       <td>
                                           <input disabled value={this.state.monthlyAdjustedIncome}></input>
                                       </td>
                                      
                                       <td>
                                       <button type="button" onClick={() => this.backStepsbutton(2)} className="success extrasp" value="Review">Review </button>
                                       </td>
                                   </tr>
                               </tbody>
                           </table>
                                    <div>
                                            <button type="button" size="md" color="success extrasp"
                                           onClick={this.saveAndContinue}  className="float-right" >
                                                <i className="fa fa-dot-circle-o"></i>Next
                                            </button>
                                            <button type="button" size="md" color="success extrasp" className="float-right"
                                             onClick={this.backSteps}  >
                                                <i className="fa fa-dot-circle-o"></i>Back
                                            </button>
                                            </div>
                                        <div>
                                           74% Done 
                                            </div>
                              
                        
                    </div>
               
                )
            case 5:
                return (
                    <div className="animated fadeIn">
                   
                                <h1>Results</h1>
                               
                                    <form  onSubmit={this.submit}>
                                        <table bordered>
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
                                                               
                                                                    <input  onChange={this.totalMonthlyRentChange}/>
                                                                    
                                                                
                                                                </td>   
                                                            </tr>
                                                            <tr>
                                                                <td>2</td>
                                                                <td>Current lease period (in months)</td>
                                                                <td>Specify the current lease period in months: e.g. 12 months, 24 months, etc</td>
                                                                <td>
                                                                <input className="border" type="text"  onChange={this.currentLeasePeriodChange}></input>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>3</td>
                                                                <td>Are utilities included in the rent?</td>
                                                                <td></td>
                                                                <td>
                                                                <input type="radio"  value="true" onChange={this.utilitiesIncludedChange} checked={this.state.utilitiesIncluded==="true"}></input>Yes
                                                                <br></br>
                                                                <input type="radio"  value="false" onChange={this.utilitiesIncludedChange} checked={this.state.utilitiesIncluded==="false"}></input>No
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>4</td>
                                                                <td>Utility allowance</td>
                                                                <td>A tenant is only eligible for a utility allowance if utilities are NOT included in the rent charge. Copies of HUD-approved utility allowance charts may be obtained from local Housing Authorities and are updated periodically. </td>
                                                                <td>
                                                               
                                                                    <input onChange={this.utilityAllowanceChange}/>
                                                                    
                                                                
                                                                </td>
                                                            </tr>
                                                            
                                                        
                                                            
                                                        </tbody>
        
        
                                                </table>
                                       
                                            <label sm="6" size="mb" htmlFor="input-large">Tenant Rent Responsibility</label>
                                          
                                               
                                                    <input value={this.state.tenantRentResponsibility} />
                                                    
                                          
                                            <label sm="6" size="mb" htmlFor="input-large">Rent Subsidy Payment</label>
                                          
                                               
                                                    <input value={this.state.rentSubsidyPayment} />
                                                    
                                                
                                          
                                        <div>
                                                
                                        <button type="button" size="md" color="success extrasp" className="float-right"
                                             onClick={this.backbutton}  >
                                                <i className="fa fa-dot-circle-o"></i>Back
                                            </button>
                                        </div>
                                    
                                        <button type="button" size="md" color="primary extrasp"  onClick={this.saveAndContinue}  >
                                            Submit
                                        </button>
                                        <div>
                                         84% Done 
                                    </div>
                                    </form>
                                
                        
                    </div>
               
                )
			
            case 6:
                return(
                    <h1>redirect to result</h1>
                )    
		}
        
    }
}


export default RentCalculator
