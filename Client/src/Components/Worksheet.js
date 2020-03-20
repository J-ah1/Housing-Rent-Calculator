import React, { Component } from 'react'
import axios from 'axios';

 class Worksheet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            worksheets: []
        }
        this.handleSettingState = this.handleSettingState.bind(this);
    }

    componentDidMount(){
        axios.get(`http://localhost:8000/db.cfc?method=clientWorksheetProfile&clientID=${this.props.id}`)
            .then(res => this.handleSettingState(res.data.DATA));
    }

    handleSettingState = (worksheets) => {
        let sheets = [];
        console.log(worksheets)
        worksheets.forEach(worksheet => {
            let date = new Date(worksheet[0]);
            date = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
            sheets.push({Date: date, Calculation: worksheet[1]})
        })
        this.setState({
            worksheets: sheets
        })
    }

    render() {
        return (
            <div align="center">
                <h1>Worksheet </h1>
                    <table  border="2" cellPadding="10px">
                        <thead>
                            <tr>
                                <th>Date of Submission</th>
                                <th>Rent Calculation</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.worksheets.length > 0 ? this.state.worksheets.map((sheet, index)=> {
                                return(
                                    <tr key={index}>
                                        <td>{sheet.Date}</td>
                                        <td>${sheet.Calculation}</td>
                                        <td><button>View</button><button>Print</button></td>
                                    </tr>
                                )
                            }) : null}
                        </tbody>
                    </table>    
            </div>
        )
    }
}

export default Worksheet