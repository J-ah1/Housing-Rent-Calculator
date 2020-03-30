import React, { Component } from 'react';
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
            page: 0,
            page1Results: new Array(11).fill(0),
            page2Results: new Array(8).fill(0),
            page3Results: new Array(9).fill(0),
            page4Results: new Array(3).fill(0),
            page5Results: new Array(6).fill(0),
        }
    }

    componentDidMount = () => {
        this.setState({
            id: this.props.match.params.id
        })
    }

    clickedBack = (e) =>{
        if(this.state.page !== 1){
            const page = this.state.page - 1
            this.setState({
                page: page
            })
        }
    }

    clickedNext = (e) =>{
        const page = this.state.page + 1
        this.setState({
            page: page
        })
    }

    handleViewChange = (page) => {
        this.setState({
            page: page
        })
    }

    page1Answers = (event) => {
        let temp = this.state.page1Results;
        temp[event.target.id] = event.target.value;

        temp[9] = 0
        for(let i = 0; i < 8; i++){
            //later we have to check, if some expected number is NaN to default to 0 in results
            if(!isNaN(parseFloat(temp[i]))){
                temp[9] += parseFloat(temp[i])
            }
        }
        temp[10] = temp[9]/12;
        this.setState({
            page1Results: temp
        });
        this.page4Answers()
    }

    page2Answers = (event) => {
        let temp = this.state.page2Results;
        temp[event.target.id] = event.target.value
        temp[5]=0
        for(let i = 3; i < 5; i++){
            //later we have to check, if some expected number is NaN to default to 0 in results
            if(!isNaN(parseFloat(temp[i]))){
                temp[5] += parseFloat(temp[i])
            }
        }
        temp[6] = (this.state.page1Results[9] * .03)
        temp[7] = parseFloat(temp[5]) - parseFloat(temp[6])
        if(temp[7]<0){ //if temp[7] < 0 it should default to 0
            temp[7]=0
        }
        console.log(temp)
        this.setState({
            page2Results: temp
        })
        this.page4Answers()
    }

    page3Answers = (event) => {
        let temp = this.state.page3Results;
        temp[event.target.id] = event.target.value
        temp[8]=0;
        for(let i = 6; i < 8; i++){
            //later we have to check, if some expected number is NaN to default to 0 in results
            if(!isNaN(parseFloat(temp[i]))){
                temp[8] += parseFloat(temp[i])
            }
        }
        temp[8] -= temp[5]
        if(temp[8]<0){
            temp[8]=0 //set to 0 if this total is negative
        }

        //if currDate - incomeIncreaseDate > 12months (365 days), temp[8] = temp[8]/2
        let currDate = new Date()
        let newDate = currDate //initialize so that difference is 0
        if(temp[4]!= 0 || temp[4] != ""){ //when a new date is added reset the value of newDate
            newDate = new Date(temp[4])
        }

        let difference = Math.abs(Math.floor((currDate.getTime()-newDate.getTime())/(1000*3600*24)))
        if(difference > 365){
            temp[8] = temp[8]/2
        }

        this.setState({
            page3Results: temp
        })
        this.page4Answers()
    }

    page4Answers = () => {
        let temp = this.state.page4Results;
        
        temp[0] = (parseFloat(this.state.page2Results) * 480) + (this.state.page2Results[1] === "Yes" ? 400 : 0) + 
                    parseFloat(this.state.page2Results[2]) + this.state.page2Results[7] + this.state.page3Results[8]

        temp[1] = this.state.page1Results[9] - temp[0]
        temp[2] = (temp[1] / 12).toFixed(2)

        this.setState({
            page4Results: temp
        })
    }

    page5Answers = (event) => {
        let temp = this.state.page5Results;
        temp[event.target.id] = event.target.value
        
        if(this.state.page1Results[8] === "Yes"){
            temp[4] = 0
        } else {
            if(true) { // Fix if statement for actual conditional
                temp[4] = (this.state.page1Results[10] * .30).toFixed(2)
            }
            else {
                temp[4] = (this.state.page1Results[10] * .10) > (this.state.page4Results[3] * .30) ? (this.state.page1Results[10] * .10) : (this.state.page4Results[3] * .30)
            }
        }

        temp[4] = temp[4] - (temp[2] === "No" ? parseFloat(temp[3]) : 0)
        temp[5] = parseFloat(temp[0]) - temp[4] > 0 ? parseFloat(temp[0]) - temp[4] : parseFloat(temp[0])
        
        this.setState({
            page5Results: temp
        })
    }

    submitCalculations = (event) => {
        event.preventDefault();
        console.log(this.state.page1Results, this.state.page2Results, this.state.page3Results, this.state.page4Results, this.state.page5Results)
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
                    results = {this.state.page3Results}
                    total1 = {this.state.page3Results[8]}
                />
                break;
            case(4):
                console.log("show page 4 of rent calculator")
                inputs = <RentCalculator4
                    viewHandler = {this.handleViewChange}
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
                    backHandler = {this.clickedBack}
                    logOffHandler = {this.clickedLogOff}
                    viewHandler = {this.handleViewChange}
                />
                break;
        }

        switch(this.state.page){
            case(0):
                button = <button type="button" onClick={this.clickedNext}>Start</button>
                break;
            case(5):
                button = <button type="button" onClick={this.clickedBack}>Back</button>
                break;
            default:
                button = <div>{this.state.page < 2 ? null : <button type="button" onClick={this.clickedBack}>Back</button>}<button type="button" onClick={this.clickedNext}>Next</button></div>
                break;
        }

        return(
            <div>
                <form>
                    {inputs}
                </form>
                

                {this.state.page < 1 ? null : <div style={{display:'flex', justifyContent:'center', margin: '1em 0'}}>
                    <meter value={this.state.page - 1} min="0" max="4" style={{width: '75%'}}></meter>
                </div>}
                
                <div style={{display: 'flex', justifyContent: 'center'}}>
                   {button} 
                </div>
            </div>
        );
    }
}

export default RentCalculator;
