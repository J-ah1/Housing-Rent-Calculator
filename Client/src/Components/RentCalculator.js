import React, { Component } from 'react';
//import {Link, Redirect} from 'react-router-dom';

import RentCalculator0 from './RentCalculator0'
import RentCalculator1 from './RentCalculator1'
import RentCalculator2 from './RentCalculator2'
import { findByLabelText } from '@testing-library/react';
import RentCalculator4 from './RentCalculator4';


class RentCalculator extends Component {
    constructor(props){
        super(props);
        this.state={
            id: -1,
            page: 0,
            page1Results: new Array(11).fill(0),
            page2Results: new Array(8).fill(0),
            page4Results: new Array(9).fill(0),

        }
    }

    componentDidMount = () => {
        this.setState({
            id: 1
        })
    }

    clickedBack = (e) =>{
        if(this.state.page !== 1){
            const page = this.state.page - 1
            this.setState({
                page: page
            })
            if(page===4){
                this.page4Answers()
            }
        }
    }

    clickedNext = (e) =>{
        const page = this.state.page + 1
        this.setState({
            page: page
        })
        if(page===4){
            this.page4Answers()
        }
    }

    //page4 this is use for jump the page
    clickedReview = (page) =>{
        this.setState({
            page: page
        })
    }

    handleViewChange = (e) => {
        switch(this.state.page){
            case(1):
                this.setState({page:2})
                break;
            case(2):
                this.setState({page:3})
                break;
            case(3):
                this.setState({page:4})

                break;
            case(4):

                this.setState({page:5})
                 break;
            case(5):
                this.setState({page:6})
                break;
            default:
                this.setState({page:1})
                break;
        }
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
    }
   //page4Answers is use for inut take and set state
    page4Answers(){


        let temp = this.state.page4Results;
        temp[0] = Number(this.state.page2Results[0])
        if(this.state.page2Results[1]=="yes"){
            temp[1] = 400
        }else{
            temp[1] = 0
        }

        temp[2] = Number(this.state.page2Results[2])
        temp[3] = this.state.page2Results[7]
        temp[4] = 20//applicableEID  this is step3 props
        temp[5] = this.state.page1Results[9]

        temp[6] = Number(temp[0] * .480)+Number(temp[1])+Number(temp[2])+Number(temp[3])+Number(temp[4])
        temp[7] = Number(temp[5]) - Number(temp[6])
        temp[8] = Number(Math.round(temp[7]/12).toFixed())

        console.log(temp)
        this.setState({
            page4Results: temp
        })
    }

    render(){
        let page = this.state.page;
        var inputs;

        switch(page){
            case(1):
                console.log("show page 1 of rent calculator")
                inputs = <RentCalculator1
                    viewHandler = {this.handleViewChange}
                    inputHandler = {this.page1Answers}
                    results = {this.state.page1Results}
                    total1={this.state.page1Results[9]}
                    total2={this.state.page1Results[10]}
                />
                break;
            case(2):
                console.log("show page 2 of rent calculator")
                inputs = <RentCalculator2
                    viewHandler = {this.handleViewChange}
                    inputHandler={this.page2Answers}
                    results = {this.state.page2Results}
                    total1={this.state.page2Results[5]}
                    total2={this.state.page2Results[6]}
                    total3={this.state.page2Results[7]}
                />
                break;
            case(3):
                console.log("show page 3 of rent calculator")

                break;
            case(4):
                console.log("show page 4 of rent calculator")
               //add Component for page 4
                inputs = <RentCalculator4
                    viewHandler = {this.handleViewChange}
                    inputHandler = {this.page4Answers}
                    results = {this.state.page4Results}
                    reviewHandler={this.clickedReview}
                    total1={this.state.page1Results[9]}
                    total2={this.state.page4Results[6]}
                    total3={this.state.page4Results[7]}
                    total4={this.state.page4Results[8]}

                />
                break;
            case(5):
                console.log("show page 5 of rent calculator")

                break;
            default:
                inputs = <RentCalculator0
                    backHandler = {this.clickedBack}
                    logOffHandler = {this.clickedLogOff}
                    viewHandler = {this.handleViewChange}


                />
                break;
        }

        return(
            <div>
                <form>
                    {inputs}
                </form>
                

                <div style={{display:'flex', justifyContent:'center', margin: '1em 0'}}>
                    <meter value={this.state.page - 1} min="0" max="5" style={{width: '75%'}}></meter>
                </div>
                
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    {this.state.page < 2 ? null : <button type="button" onClick={this.clickedBack}>Back</button>}
                    {this.state.page === 0 ? null : <button type="button" onClick={this.clickedNext}>Next</button>}
                </div>
            </div>
        );
    }
}

export default RentCalculator;
