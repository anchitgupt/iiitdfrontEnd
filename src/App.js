import React from 'react';
import './App.css';
import * as firebase from 'firebase'
import {DB_CONFIG} from './firebase.js'
import Booking from './booking'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class compToPrint extends React.Component{
  constructor(props){
      super(props);
      firebase.initializeApp(DB_CONFIG);
      this.db = firebase.firestore();
      this.bookingsRef = this.db.collection('bookings');
      this.state = {
        bookings : [],
        columnDefs: [
          {
            headerName: "Checked In", field: "checkedIn",filter:true,editable:true,
            cellRenderer: params => {
              return `<input type='checkbox' ${params.value ? 'checked' : ''} />`;
          }
          },
          {
            headerName: "Room No", field: "rId",sortable: true,filter:true,editable:true,
          },
          {
          headerName: "ID", field: "bId",sortable: true,filter:true,
          cellRenderer: (cellValue) => 
              `<a href="/booking/${cellValue.value}" >${cellValue.value}</a>`
        }, {
          headerName: "Name", field: "name",sortable: true,filter:true
        }, {
          headerName: "Status", field: "status",sortable: true ,filter:true,editable:true
        }]
      }
  }

  componentDidMount(){
    let bookingsList = []
    this.bookingsRef.get().then((data)=>{
      let docs = data.docs;
      docs.forEach(doc => {
        bookingsList.push(doc.data());  
      });
      this.setState({
        bookings:bookingsList
      })
    })
  }

  onButtonClick = e => {
    const selectedNodes = this.gridApi.getEditingCells();
    const selectedData = selectedNodes.map( node => node.data )
    const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ')
    alert(`Selected nodes: ${selectedDataStringPresentation}`)
    }

  render() {
    return (
      <div 
        className="ag-theme-balham"
        style={{ 
        height: '550px', 
        width: '1200px' }} 
      >
         <button onClick={this.onButtonClick}>Get selected rows</button>
        <AgGridReact
          onGridReady={ params => this.gridApi = params.api }
          pagination = {true}
          columnDefs={this.state.columnDefs}
          rowData={this.state.bookings}>
        </AgGridReact>
      </div>
    );
  }

  
}



export default compToPrint;
