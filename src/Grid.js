import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';



class Grid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
                { headerName: 'Maked',   field: 'make' , rowGroupIndex: 0},
                {headerName:'Render-Indicator', field:'Render-Indicator', cellStyle:function(params) {
                    const hue = Math.floor(Math.random() * 255);
                    //return `hsl(${hue}, 100%, 50%)`;
                    return {
                        backgroundColor: `hsl(${hue}, 100%, 50%)`
                    }
                }},
                { headerName: 'Price',  field: 'price' },
                { headerName: 'Year',   field: 'year' }
            ],

            autoGroupColumnDef: {
                headerName: "Model",
                field:"model",
                cellRenderer:'agGroupCellRenderer',
                cellRendererParams: {
                    checkbox: true
                }
            }
            /*
            rowData: [
                { make: 'Toyota',   model: 'Celica',    price: 35000,   year: 1996},
                { make: 'Ford',     model: 'Mondeo',    price: 32000 ,  year: 1996},
                { make: 'Porsche',  model: 'Boxter',    price: 72000 ,  year: 1996}
            ]
            */
        }
    }

    onClickHandler=()=> {
       const selectedNodes = this.gridApi.getSelectedNodes();
       const selectedData = selectedNodes.map(node => node.data);

       console.log('selected data ', selectedData);
    }
     /*
    const hue = Math.floor(Math.random() * 255);
    return `hsl(${hue}, 100%, 50%)`;
    */

    /*
randomIcon() {
    const hue = Math.floor(Math.random() * 255);
    return `hsl(${hue}, 100%, 50%)`;
  }



    */

    updateData=(data)=>{
        let rowData = data.map(row=>{
            let hue = Math.floor(Math.random() *225);
           //return {...row, ...{"Render-Indicator":`hsl(${hue}, 100%, 50%)`}} 
           return {...row, ...{"Render-Indicator": hue}}
        });
        this.setState({rowData});
        //return convertedData  
    }

    componentDidMount(){
        fetch('http://localhost:3000/rowData')
            .then(result=> result.json())
           //.then(rowData => this.setState({rowData}))
           .then(rowData => this.updateData(rowData))
           
    }

    render() {
        return (
            <div
                className="ag-theme-balham"
                style={{
                    height: '500px',
                    width: '800px'
                }}
            >
            <button onClick={this.onClickHandler}  >Get selected rows</button>
                <AgGridReact
                    onGridReady={params=>this.gridApi= console.log('what is the api',params.api) || params.api}
                    enableSorting={true}
                    groupSelectsChildren={true}
                    autoGroupColumnDef = {this.state.autoGroupColumnDef}
                    enableFilter={true}
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData} >
                </AgGridReact>
            </div >
        )
    }

}  // end of Grid definition

export default Grid;