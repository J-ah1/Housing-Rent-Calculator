import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';

import {calcQuestions} from '../Questions';

class RentCalculator extends Component {
    constructor(props){
        super(props);
        this.state={
            clientName: '',
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
        axios.get(`http://localhost:8500/db.cfc?method=viewCWorksheets&id=${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    date: res.data.DATA[0][3],
                    data: res.data.DATA[0],
                    loading: false
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

        if(this.state.loading){
            view = <div>
                        <ReactLoading id="client-worksheet-loading" type={'spin'} color={'turquoise'} height={100} width={100}/>
                    </div>
        }else{
            view = <div>
                        <h2>{this.state.user}</h2>
                        <h3>Date Submitted: {this.state.date}</h3>
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
