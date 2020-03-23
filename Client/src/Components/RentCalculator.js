import React, { Component } from 'react';
//import {Link, Redirect} from 'react-router-dom';
import RentCalculator0 from './RentCalculator0'
import RentCalculator1 from './RentCalculator1'
import RentCalculator2 from './RentCalculator2'

class RentCalculator extends Component {
    constructor(props){
        super(props);
        this.state={
            id: -1,
            page: 0,
            page2Results: [],
        }
    }

    componentDidMount = () => {
        this.setState({
            id: this.props.location.state.id
        })
    }

    clickedBack = (e) =>{
        console.log('Take the user back to the client worksheets page.')
        //this needs to be changed so that it redirects to the profile page with client ID
        // this.props.history.push({
        //     pathname: '/profile/${id}',
        // })
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
                break;
            case(4):
                break;
            case(5):  
                break;
            default:
                this.setState({page:1})
                break;
        }    
    }

    page2Answers = (event) => {
        let temp = this.state.page2Results;
        temp[event.target.id] = event.target.value
        temp[5] = parseInt(temp[3]) + parseInt(temp[4])
        this.setState({
            page2Results: temp
        })
    }

    render(){
        let page = this.state.page;
        var inputs;
        
        switch(page){
            case(1):
                console.log("show page 1 of rent calculator")
                inputs = <RentCalculator1 
                    //add other variables that can call functions that RentCalculator1.js might need
                    viewHandler = {this.handleViewChange}
                />
                break;
            case(2):
                console.log("show page 2 of rent calculator")
                inputs = <RentCalculator2 
                    //add other variables that can call functions that RentCalculator1.js might need
                    viewHandler = {this.handleViewChange}
                    inputHandler={this.page2Answers}
                    answer1={this.state.page2Results[5]}
                />
                break;
            case(3):
                console.log("show page 3 of rent calculator")
                break;
            case(4):
                console.log("show page 4 of rent calculator")
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
            </div>
        );
    }
}

export default RentCalculator;