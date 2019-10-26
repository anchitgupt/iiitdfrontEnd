import React from 'react';
import '../App.css';
import firebase from '../firebase';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Link } from 'react-router-dom';

class Home extends React.Component{

  constructor(props){
      super(props);
      this.db = firebase.firestore();
      this.bookingsRef = this.db.collection('admin_req');
      this.unsubscribe = null;

      this.state = {
        bookings : [],
        columnDefs: [
          {
            headerName: "Room No", field: "room",sortable: true,filter:true,
          },
          {
          headerName: "ID", field: "bId",sortable: true,filter:true,
          cellRenderer: (cellValue) =>
              `<a href="/show/${cellValue.value}" >${cellValue.value}</a>`
        },
            {
          headerName: "Name", field: "name",sortable: true,filter:true
        }, {
          headerName: "Status", field: "status",sortable: true ,filter:true
        },
        {
          headerName: "From", field: "arrivalDate",sortable: true ,filter:true,
        },
        {
          headerName: "To", field: "departureDate",sortable: true ,filter:true,
        },
            {
                headerName: "Payment", field: "payment",sortable: true ,filter:true,
            },
      ]
      };

  }

    dateToString=(date)=>{

        //console.log("Nonosecond: ",);
        date = date.toDate().toLocaleDateString();//new Date(date.nanoseconds).toLocaleDateString();
        //console.log("Date: ",date);

      var dd = date.split("/")[0];
      var mm = parseInt(date.split("/")[1]) + 1;
      var yyyy = date.split("/")[2];
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      return dd + '/' + mm + '/' + yyyy;
    }

    onCollectionUpdate = (querySnapshot) => {

    let bookingsList = [];

    querySnapshot.forEach((doc) => {


        var arrivalDat = this.dateToString(doc.get('departureDate'));
        var  departureDat = this.dateToString(doc.get('arrivalDate'));
      
      let { arrivalDate, departureDate, email, empno, name, paymentType, roomType, type, uid, vname, vpurpose  } = doc.data();
      bookingsList.push({
        bId: doc.id,
       arrivalDate: arrivalDat,
        departureDate: departureDat,
        email, 
        empno, 
        name,
         paymentType, 
         roomType, 
         type, 
         uid,
          vname, 
          vpurpose
      });
    });
    
    this.setState({
             bookings:bookingsList
           })

  }


  componentDidMount(){
    this.unsubscribe = this.bookingsRef.onSnapshot(this.onCollectionUpdate);
  }


  render() {
    return (
      <div 
        className="ag-theme-balham"
        style={{ 
        height: '500px', 
        width: '1200px' }} 
      >
        <hr></hr>
        
        <h4><Link to="/create" className="btn btn-primary">Add Booking</Link></h4>
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
