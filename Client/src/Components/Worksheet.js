import React, { Component } from 'react'

 class Worksheet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            worksheets: []
        }
        this.handleSettingState = this.handleSettingState.bind(this);
    }

    componentDidMount(){
        var request = new XMLHttpRequest();
        request.open("GET", `http://localhost:8000/db.cfc?method=clientWorksheetProfile&clientID=${parseInt(this.props.id)}`, false);
        request.send();
        var parser = new DOMParser()
        this.handleSettingState(parser.parseFromString(request.responseText, "text/xml"))
    }

    handleSettingState = (xml) => {
        let root = xml.getElementsByTagName('field');
        let sheets = []
        for(let i = 0; i < root.length; i += 2){
            let date = new Date(root[i].textContent);
            date = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
            sheets.push({Date: date, Calculation: root[i+1].textContent})
        }
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

/*this.state.data.map((row, i) =>
                        row.dateSubmitted?
                                        <tr key={i+1}>
                                        <td>{row.dateSubmitted?row.dateSubmitted:null}</td> 
                                        <td>{row.tenantRentResponsibility?row.tenantRentResponsibility:null}</td> 
                                        
                                        <td>
                                            <button type="submit" size="md" color="success "   onClick={() => {  this.props.history.push("/result/"+row.id);}} > View </button>
                                            <button Style="margin-left:10px" type="submit" size="md" color="primary " onClick={() => {  this.props.history.push("/result/"+row.id+"?isprint=true&cid="+this.state.cid);}} > Print </button>
                                        </td> 
                                            
                                        </tr>
                                        :null
                        )*/