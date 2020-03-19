import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';

import RentCalculator0 from './RentCalculator0'

class RentCalculator extends Component {
    constructor(props){
        super(props);
        this.state={
            page: 0
        }
    }

    clickedStart = (e) =>{
        console.log('Take the user to the first page of the rent calculator.')
        //redirect to first page of rent calculator
        /*this.props.history.push({
            pathname: '/rc1',
        })*/
    }

    clickedBack = (e) =>{
        console.log('Take the user back to the client worksheets page.')
        //this needs to be changed so that it redirects to the profile page with client ID
        this.props.history.push({
            pathname: '/profile/${id}',
        })
    }

    clickedLogOff = (e) =>{
        console.log('Log the user off.')
        this.props.history.push({
            pathname: '/',
        })
    }

    render(){
        let page = this.state.page;
        var inputs;
        if(page === 0){
            inputs =
            <RentCalculator0 
                backHandler = {this.clickedBack}
                logOffHandler = {this.clickedLogOff}
                startHandler = {this.clickedStart}
            />
            //<Link to></Link>
        }

        if(page === 1){
            
        }

        if(page === 2){
            
        }

        if(page === 3){
            
        }

        if(page === 4){
            
        }

        if(page === 5){
            
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