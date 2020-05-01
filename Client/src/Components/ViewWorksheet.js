import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';

import {calcQuestions} from '../Questions';

class RentCalculator extends Component {
    constructor(props){
        super(props);
        this.state={
            clientName: '',
            clientID: -1,
            userID: -1,
<<<<<<< HEAD
<<<<<<< HEAD
            hcName: '',
=======
>>>>>>> 2b6e3e9942a929e2465261e657bce21f95450466
=======
>>>>>>> 2b6e3e9942a929e2465261e657bce21f95450466
            date: '',
            data: [],
            fields: [calcQuestions['annualHouseholdWages'], calcQuestions['periodicPayment'], calcQuestions['unearnedIncome'], 
                    calcQuestions['receivedIncome'], calcQuestions['businessIncome'], calcQuestions['investments'], 
                    calcQuestions['armedForcesPay'], calcQuestions['publicAssistanceRecieved'], calcQuestions['welfareReliant'],
                    calcQuestions['annualGrossIncome'], calcQuestions['monthlyGrossIncome'], calcQuestions['numDependents'], calcQuestions['disabledDeduction'], calcQuestions['childcareExp'], 
                    calcQuestions['attendExp'], calcQuestions['elderlyExp'], calcQuestions['medExp'], calcQuestions['perAGI'], calcQuestions['medDeduction'], calcQuestions['inHOPWA'], calcQuestions['employmentIncomeIncrease'], calcQuestions['selfSufficientIncome'], 
                    calcQuestions['incomeWSixMo'], calcQuestions['incomeIncreaseDate'], calcQuestions['baselineIncome'], calcQuestions['incomeEID'], 
                    calcQuestions['otherIncomeEID'], calcQuestions['applicableEID'], calcQuestions['totalAllowance'], calcQuestions['annualAdjustedIncome'], calcQuestions['monthlyAdjustedIncome'], calcQuestions['totalMonthlyRent'], calcQuestions['currentLeasePeriod'], calcQuestions['utilitiesIncluded'], 
                    calcQuestions['utilityAllowance'], calcQuestions['tenantRentResponsibility'], calcQuestions['rentSubsidyPayment']
                ],
            loading: true
        }
        
    }

    componentDidMount = () => {
        axios.get(`http://localhost:8000/db.cfc?method=viewCWorksheets&id=${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    userID: res.data.DATA[0][1],
                    date: res.data.DATA[0][3],
                    clientID: res.data.DATA[0][2],
                    data: res.data.DATA[0],
                    loading: false
                })
                axios.get(`http://localhost:8500/db.cfc?method=getHCName&id=${this.state.userID}`).then(res =>{
                    this.setState({hcName: res.data})
                })
            })
        
    }

    typeHandle = (value) => {
        switch(typeof(value)){
            case('number'):
                return '$' + value;
                break;
            case('boolean'):
                return  value.toString();
                break;
            case('string'):
                return  value
                break;
            default:
                return 'N/A'
                break;
        }
    }

    
    render(){
        let count = 3;
        let view;
       
        var self = this;
        
        if(window.location.href.indexOf("/print")>-1 && this.state.loading == false ){
            
            //wait for page to load before displaying dialog box
            setTimeout(function() {
                    //after print dialog box closes, redirect to profile
                    var onPrintFinished = function(printed){console.log(self.props.history.go(-1))}
                    //print the page
                    onPrintFinished(window.print());
            }, 500)
            
        }

        if(this.state.loading){
            view = <div>
                        <ReactLoading id="client-worksheet-loading" type={'spin'} color={'turquoise'} height={100} width={100}/>
                    </div>
        }else{
            view = <div>
                        <button onClick = { (e) => this.props.history.push(`/profile/${this.state.clientID}`) } style={{float : 'left', paddingRight : '5px'}}>Back</button>
                        <h2>{this.state.user}</h2>
                        <h3>Date Submitted: {this.state.date}</h3>
<<<<<<< HEAD
<<<<<<< HEAD
                        <h3>Submitted by: {this.state.hcName}</h3>
=======
                        <h3>Submitted by: {this.state.userID}</h3>
>>>>>>> 2b6e3e9942a929e2465261e657bce21f95450466
=======
                        <h3>Submitted by: {this.state.userID}</h3>
>>>>>>> 2b6e3e9942a929e2465261e657bce21f95450466
                        <table style={{width: '75%'}} border="2" cellPadding="10px">
                                <thead>
                                    <tr>
                                        <th>Label</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.length > 0 ? this.state.fields.map(field => {
                                        count++
                                        return (<tr key={count}>
                                            <td>{field.label}</td>
                                            <td>{this.typeHandle(this.state.data[count])}</td>
                                        </tr>)}) : null
                                    }
                                </tbody>
                            </table>
                    </div>
        }


        return(
            <div>
                {view}
            </div>
        );
    }
}

export default RentCalculator;
