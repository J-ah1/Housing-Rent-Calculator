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
        
        switch(page){
            case(1):
                break;
            case(2):
                break;
            case(3):
                break;
            case(4):
                break;
            case(5):
                break;
            default:
                inputs = <RentCalculator0 
                backHandler = {this.clickedBack}
                logOffHandler = {this.clickedLogOff}
                startHandler = {this.clickedStart}
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