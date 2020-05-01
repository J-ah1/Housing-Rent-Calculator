import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
//import {Link, Redirect} from 'react-router-dom';
import RentCalculator0 from './RentCalculator0'
import RentCalculator1 from './RentCalculator1'
import RentCalculator2 from './RentCalculator2'
import RentCalculator3 from './RentCalculator3'
import RentCalculator4 from './RentCalculator4';
import RentCalculator5 from './RentCalculator5';
//import { findByLabelText } from '@testing-library/react';
//import { useParams } from 'react-router-dom';


class RentCalculator extends Component {
    constructor(props){
        super(props);
        this.state={
            id: -1,
            userID: -1,
            page: 0,
            progressBar: 0,
            startDate: null,
            incomeIncreaseDate: false,
            page1Results: new Array(11).fill(0),
            page2Results: new Array(8).fill(0),
            page3Results: new Array(9).fill(0),
            page4Results: new Array(3).fill(0),
            page5Results: new Array(6).fill(0),
        }
    }

    componentDidMount = () => {
        this.setState({
            id: this.props.match.params.id,
            userID: Cookies.get('userID')
        })
        window.$('[data-toggle="popover"]').popover({
            trigger:'hover'
        });
    }

    componentDidUpdate = () => {
        window.$('[data-toggle="popover"]').popover({
            trigger:'hover'
        });
    }

    goToProfile = (e) => {
        this.props.history.push(`/profile/${this.state.id}`)
    }

    clickedBack = (e) =>{
        window.scroll(0,0);
        if(this.state.page !== 1){
            const page = this.state.page - 1
            this.setState({
                page: page
            })
        }
    }

    clickedNext = (e) =>{
        window.scroll(0,0);

        const {page, progressBar} = this.state;
        
        if(page !== 1 | this.state.page1Results[8] !== 0) {
            this.setState(prevState => ({
                page: prevState.page + 1
            }))
    
            if(progressBar === page){
                this.setState(prevState => ({
                    progressBar: prevState.progressBar + 1
                }))
            }
        } else {
            alert("Please provide an answer for Question 9")
        }
    }

    handleViewChange = (page) => {
        this.setState({
            page: page
        })
    }

    handleDateChange = (date) => {
        this.setState({
            startDate: date
        })

        if(date !== null){
            const dd = String(date.getDate()).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            date = `${date.getFullYear()}-${mm}-${dd}`
        }
        this.page3Answers(1, date)
    }

    defaultNegative = (arr) =>{
        for(let i = 0; i<arr.length; i++){
            //if the value is a number and negative, then default to zer0
            if(!isNaN(parseFloat(arr[i])) && parseFloat(arr[i])<0){
                arr[i]=0
            }
        }
    }


    page1Answers = (event) => {
        let temp = this.state.page1Results;
        temp[event.target.id] = event.target.value;
        this.state.page2Results[1]=400

        temp[9] = 0
        for(let i = 0; i < 8; i++){
            //later we have to check, if some expected number is NaN to default to 0 in results
            if(!isNaN(parseFloat(temp[i]))){
                temp[9] += parseFloat(temp[i])
            }
        }
        temp[9] = Math.round(100*temp[9])/100;

        temp[10] = temp[9]/12;
        temp[10] = Math.round(100*temp[10])/100;

        this.defaultNegative(temp)
        this.setState({
            page1Results: temp
        });
        this.page4Answers()
    }

    page2Answers = (event) => {
        let temp = this.state.page2Results;
        temp[event.target.id] = event.target.value
        temp[1]=400
        temp[5]=0
        for(let i = 3; i < 5; i++){
            //later we have to check, if some expected number is NaN to default to 0 in results
            if(!isNaN(parseFloat(temp[i]))){
                temp[5] += parseFloat(temp[i])
            }
        }
        temp[5] = Math.round(100*temp[5])/100;

        temp[6] = (this.state.page1Results[9] * .03)
        temp[6] = Math.round(100*temp[6])/100;

        temp[7] = parseFloat(temp[5]) - parseFloat(temp[6])
        temp[7] = Math.round(100*temp[7])/100;
        
        
        this.defaultNegative(temp)
        console.log(temp)
        this.setState({
            page2Results: temp
        })
        this.page4Answers()
    }

    page3Answers = (event, date = false) => {
        let temp = this.state.page3Results;
        this.state.page2Results[1]=400

        if(date !== false){
            temp[4] = date
        }
        else {
            temp[event.target.id] = event.target.value
            temp[8]=0;
            for(let i = 6; i < 8; i++){
                //later we have to check, if some expected number is NaN to default to 0 in results
                if(!isNaN(parseFloat(temp[i]))){
                    temp[8] += parseFloat(temp[i])
                }
            }
            temp[8] -= temp[5]
        }

        //if currDate - incomeIncreaseDate > 12months (365 days), temp[8] = temp[8]/2
        let currDate = new Date()
        let newDate = currDate //initialize so that difference is 0
        if( temp[4] != 0 || temp[4] != ""){ //when a new date is added reset the value of newDate
            newDate = new Date(temp[4])
        }

        //wishlist check for invalid future date
        let difference = Math.abs(Math.ceil((currDate.getTime()-newDate.getTime())/(1000*3600*24)))

        //Accomodate when the user clears out the datepicker field 
        let errorDate = new Date(null)
        let errorDifference = Math.abs(Math.ceil((currDate.getTime()-errorDate.getTime())/(1000*3600*24)))
        if(difference == errorDifference){
            difference = 0
        } 

        if(difference < 365 && this.state.incomeIncreaseDate){
            temp[8] = temp[8] * 2
            this.setState({
                incomeIncreaseDate: false
            })
        }
        else if(difference > 365 && !this.state.incomeIncreaseDate){
            temp[8] = temp[8]/2
            this.setState({
                incomeIncreaseDate: true
            })
        }
        temp[8] = Math.round(100*temp[8])/100;

        this.defaultNegative(temp)
        console.log(this.state.page3Results)
        this.setState({
            page3Results: temp
        })
        this.page4Answers()
    }

    page4Answers = () => {
        let temp = this.state.page4Results;
        
        //field 29 comes from page1Results[9]

        //field 30
        temp[0]=0
        temp[0] +=  !isNaN(parseFloat(this.state.page2Results[0])) ? (parseFloat(this.state.page2Results[0])*480) : 0
        temp[0] +=  !isNaN(parseFloat(this.state.page2Results[2])) ? parseFloat(this.state.page2Results[2]) : 0
        temp[0] +=  this.state.page2Results[1] + this.state.page2Results[7] + this.state.page3Results[8]
        temp[0] = Math.round(100*temp[0])/100;

        //field 31
        temp[1] = parseFloat(this.state.page1Results[9]) - parseFloat(temp[0])
        temp[1] = Math.round(100*temp[1])/100;

        //field 32
        temp[2] = temp[1]/12
        temp[2] = Math.round(100*temp[2])/100;

        this.defaultNegative(temp)
        console.log(temp)
        this.setState({
            page4Results: temp
        })
    }

    page5Answers = (event) => {
        let temp = this.state.page5Results;
        temp[event.target.id] = event.target.value
        this.state.page2Results[1]=400

        let otherIncome = false;
        
        if(this.state.page1Results[8] === "Yes"){
            //if client solely depended on public assitance
            temp[4] = 0
        } else {
           
            //find out if some other income was entered
            for(let i = 0; i< 7; i++){
                if(parseFloat(this.state.page1Results[i])>0 || this.state.page1Results[i] != ""){
                    otherIncome = true;
                    break;
                }
            }

            //if input in "Public assistance received" field was deleted, default now to zero
            if(isNaN(this.state.page1Results[7]))
                this.state.page1Results[7]=0

            //If an amount was entered for "Public assistance received"
                //and any other income was entered then use Method 3.
            if(this.state.page1Results[7]>0 && otherIncome){
                temp[4]= parseFloat(this.state.page1Results[10])*.30
            }

            //Otherwise use the higher value of Method 1 or Method 2.
            else{
                //if Method1 > Method2, use Method 1
                
                if((parseFloat(this.state.page4Results[2])*.30)>parseFloat(this.state.page1Results[10])*.1){
                    temp[4]=parseFloat(this.state.page4Results[2])*.30
                    console.log(temp[4])
                }
                //else use Method 2
                else{
                    temp[4]=parseFloat(this.state.page1Results[10])*.10
                }
            }
            
        }

        //If utilities are paid separately then Subtract Utility allowance
        //temp[4] = temp[4] - (temp[2] === "No" ? parseFloat(temp[3]) : 0)
        if(temp[2] === "No"){
            if(temp[3]!="")//treat deleted input like a zero,by ignoring if only a space
                temp[4]-=parseFloat(temp[3])
        }
        temp[4] = Math.round(100*temp[4])/100;

        if(!isNaN(parseFloat(temp[0])))
            temp[5] = temp[4] < 0 ? parseFloat(temp[0]) : parseFloat(temp[0])-parseFloat(temp[4])
        temp[5] = Math.round(100*temp[5])/100;

        for(let i = 0; i<temp.length; i++){
            //if the value is a number and negative, then default to zer0
            if(i==4)
                continue
            if(!isNaN(parseFloat(temp[i])) && parseFloat(temp[i])<0){
                temp[i]=0
            }
        }
        
        this.setState({
            page5Results: temp
        })
    }

    submitCalculations = (event) => {
        event.preventDefault();
        if(this.state.page5Results[2] === 0){
            alert("Please provide an answer for Question 3")
        } else {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            today = `${today.getFullYear()}-${mm}-${dd}`
            console.log(today)
<<<<<<< HEAD
            axios.get(`http://localhost:8500/db.cfc?method=addWorksheet&userID=${this.state.userID}&clientID=${this.state.id}&dateSubmitted=${today}
=======
            axios.get(`http://localhost:8000/db.cfc?method=addWorksheet&userID=${this.state.userID}&clientID=${this.state.id}&dateSubmitted=${today}
>>>>>>> 2b6e3e9942a929e2465261e657bce21f95450466
                        &annualHouseHoldWages=${this.state.page1Results[0]}
                        &periodicPayment=${this.state.page1Results[1]}
                        &unearnedIncome=${this.state.page1Results[2]}
                        &receivedIncome=${this.state.page1Results[3]}
                        &businessIncome=${this.state.page1Results[4]}
                        &investments=${this.state.page1Results[5]}
                        &armedForcesPay=${this.state.page1Results[6]}
                        &publicAssistanceReceived=${this.state.page1Results[7]}
                        &welfareReliant=${this.state.page1Results[8]}
                        &annualGrossIncome=${this.state.page1Results[9]}
                        &monthlyGrossIncome=${this.state.page1Results[10]}
                        &numDependents=${this.state.page2Results[0]}
                        &disabledDeduction=${this.state.page2Results[1]}
                        &childcareExp=${this.state.page2Results[2]}
                        &attendExp=${this.state.page2Results[3]}
                        &elderlyExp=${this.state.page2Results[4]}
                        &medExp=${this.state.page2Results[5]}
                        &perAGI=${this.state.page2Results[6]}
                        &medDeduction=${this.state.page2Results[7]}
                        &inHOPWA=${this.state.page3Results[0]}
                        &employmentIncomeIncrease=${this.state.page3Results[1]}
                        &selfSufficientIncome=${this.state.page3Results[2]}
                        &incomeWSixMo=${this.state.page3Results[3]}
                        &incomeIncreaseDate=${this.state.page3Results[4] !== 0 ? this.state.page3Results[4] : null}
                        &baselineIncome=${this.state.page3Results[5]}
                        &incomeEID=${this.state.page3Results[6]}
                        &otherIncomeEID=${this.state.page3Results[7]}
                        &applicableEID=${this.state.page3Results[8]}
                        &totalAllowance=${this.state.page4Results[0]}
                        &annualAdjustedIncome=${this.state.page4Results[1]}
                        &monthlyAdjustedIncome=${this.state.page4Results[2]}
                        &totalMonthlyRent=${this.state.page5Results[0]}
                        &currentLeasePeriod=${this.state.page5Results[1]}
                        &utilitiesIncluded=${this.state.page5Results[2]}
                        &utilityAllowance=${this.state.page5Results[3]}
                        &tenantRentResponsibility=${this.state.page5Results[4]}
                        &rentSubsidyPayment=${this.state.page5Results[5]}`)
                .then(res => {
                    console.log(res)
                    this.props.history.push(`/profile/${this.state.id}`);
                })
                .catch(error => console.log(error))
        }
    }

    render(){
        let page = this.state.page;
        var inputs;
        var button;

        switch(page){
            case(1):
                console.log("show page 1 of rent calculator")
                inputs = <RentCalculator1
                    inputHandler={this.page1Answers}
                    results={this.state.page1Results}
                    total1={this.state.page1Results[9]}
                    total2={this.state.page1Results[10]}
                />
                break;
            case(2):
                console.log("show page 2 of rent calculator")
                inputs = <RentCalculator2
                    inputHandler={this.page2Answers}
                    results = {this.state.page2Results}
                    total1 = {this.state.page2Results[5]}
                    total2 = {this.state.page2Results[6]}
                    total3 = {this.state.page2Results[7]}
                />
                break;
            case(3):
                console.log("show page 3 of rent calculator")
                inputs = <RentCalculator3
                    inputHandler = {this.page3Answers}
                    startDate = {this.state.startDate}
                    dateHandler = {this.handleDateChange}
                    results = {this.state.page3Results}
                    total1 = {this.state.page3Results[8]}
                />
                break;
            case(4):
                console.log("show page 4 of rent calculator")
                inputs = <RentCalculator4
                    viewHandler = {this.handleViewChange}
                    inputHandler = {this.page4Answers}
                    total1={this.state.page1Results[9]}
                    total2={this.state.page4Results[0]}
                    total3={this.state.page4Results[1]}
                    total4={this.state.page4Results[2]}
                />
                break;
            case(5):
                console.log("show page 5 of rent calculator")
                inputs = <RentCalculator5
                    inputHandler={this.page5Answers}
                    submit={this.submitCalculations}
                    results={this.state.page5Results}
                    total1={this.state.page5Results[4]}
                    total2={this.state.page5Results[5]}
                />
                break;
            default:
                inputs = <RentCalculator0
                    backHandler = {this.goToProfile}
                    logOffHandler = {this.clickedLogOff}
                    viewHandler = {this.handleViewChange}
                />
                break;
        }

        switch(this.state.page){
            case(0):
                button = <button className="btn text-white rent-calc-button" type="button" onClick={this.clickedNext}>Start</button>
                break;
            case(5):
                button = <button className="btn text-white rent-calc-button"  type="button" onClick={this.clickedBack}>Back</button>
                break;
            default:
                button = <div>{this.state.page < 2 ? null : <button className="btn text-white rent-calc-button"  type="button" onClick={this.clickedBack}>Back</button>}<button className="btn text-white rent-calc-button"  type="button" onClick={this.clickedNext}>Next</button></div>
                break;
        }

        return(
            <div id="rent-calc-background">
                
                    <form>
                        {inputs}
                    </form>
                    

                    {this.state.page < 1 ? null : <div style={{display:'flex', justifyContent:'center', margin: '1em 0'}}>
                        <meter value={this.state.progressBar - 1} min="0" max="4" style={{width: '75%'}}></meter>
                    </div>}
                    
                    <div id="rent-calc-button-container">
                    {button} 
                    </div>
                
            </div>
        );
    }
}

export default RentCalculator;
