import React from 'react';
import './App.css';
import firebase from './firebase';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


class Home extends React.Component{
  constructor(props){
      super(props);
      this.db = firebase.firestore();
      this.bookingsRef = this.db.collection('bookings');
      this.unsubscribe = null;

      this.state = {
        bookings : [],
        columnDefs: [
          {
            headerName: "Checked In", field: "checkedIn",filter:true,
            cellRenderer: params => {
              return `<input type='checkbox' ${params.value ? 'checked' : ''} />`;
          }
          },
          {
            headerName: "Room No", field: "rId",sortable: true,filter:true,
          },
          {
          headerName: "ID", field: "bId",sortable: true,filter:true,
          cellRenderer: (cellValue) =>
              `<a href="/booking/${cellValue.value}" >${cellValue.value}</a>`
        }, {
          headerName: "Name", field: "name",sortable: true,filter:true
        }, {
          headerName: "Status", field: "status",sortable: true ,filter:true
        }]
      }
  }

    onCollectionUpdate = (querySnapshot) => {
    let bookingsList = [];
    
    querySnapshot.forEach((doc) => {
      let { checkedIn, bId, room, name, status  } = doc.data();
      console.log(doc.id);
      bookingsList.push({
        checkedIn,   
        bId:doc.id, 
        room, 
        name, 
        status
      });
    });
    
    this.setState({
             bookings:bookingsList
           })
  }


  componentDidMount(){
    this.unsubscribe = this.bookingsRef.onSnapshot(this.onCollectionUpdate);
    //let bookingsList = []
    // this.bookingsRef.get().then((data)=>{
    //   let docs = data.docs;
    //   docs.forEach(doc => {
    //     let { checkedIn,room, name, status  } = doc.data();
    //     bookingsList.push({
    //         checkedIn,   
    //         bId:doc.id, 
    //     room, 
    //     name, 
    //     status
    //     });  
    //   });
    //   this.setState({
    //     bookings:bookingsList
    //   })
    // })
  }


  render() {
    return (
      <div 
        className="ag-theme-balham"
        style={{ 
        height: '550px', 
        width: '1200px' }} 
      >

        <AgGridReact
          pagination = {true}
          columnDefs={this.state.columnDefs}
          rowData={this.state.bookings}>
        </AgGridReact>
      </div>
    );
  }

  
}



export default Home;
