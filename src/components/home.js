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
            headerName: "Room No", field: "room",sortable: true,filter:true,suppressSizeToFit: true,width:100,
          },
          {
          headerName: "ID", field: "bId",sortable: true,filter:true,suppressSizeToFit: true,
          cellRenderer: (cellValue) =>
              `<a href="/show/${cellValue.value}" >${cellValue.value}</a>`
        },
            {
          headerName: "Name", field: "name",sortable: true,filter:true,suppressSizeToFit: true,width:150
        }, {
          headerName: "Status", field: "status",sortable: true ,filter:true,suppressSizeToFit: true,width:100
        },
        {
          headerName: "From", field: "arrivalDate",sortable: true ,filter:true,suppressSizeToFit: true,width:130
        },
        {
          headerName: "To", field: "departureDate",sortable: true ,filter:true,suppressSizeToFit: true,width:130
        },
            {
                headerName: "Payment", field: "payment",sortable: true ,filter:true,suppressSizeToFit: true,
            },
      ]
      };

  }

    dateToString=(date)=>{

        //console.log("Nonosecond: ",);
        date = date.toDate().toLocaleDateString();//new Date(date.nanoseconds).toLocaleDateString();
         console.log("Date: ",date);

      var dd = date.split("/")[0];
      var mm = parseInt(date.split("/")[1]);
        console.log(date.split("/"));
      var yyyy = date.split("/")[2];
      return dd + '/' + mm + '/' + yyyy;
    }

    onCollectionUpdate = (querySnapshot) => {

    let bookingsList = [];

    querySnapshot.forEach((doc) => {


        var arrivalDat = this.dateToString(doc.get('departureDate'));
        var  departureDat = this.dateToString(doc.get('arrivalDate'));
      
      let { arrivalDate, departureDate, email, empno, name, paymentType, roomType, type, uid, vname, vpurpose , status } = doc.data();
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
          vpurpose,
          status
      });

      bookingsList = bookingsList.reverse();
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
        width: '100%' }}
      >
        <hr></hr>
        
        <h4><Link to="/create" className="btn btn-primary">Add Booking</Link></h4>
        <AgGridReact
          pagination = {true}
          columnDefs={this.state.columnDefs}
          defaultColDef = {{resizable:true}}
          colResizeDefault = {'shift'}
          rowData={this.state.bookings}
          enableRangeSelection={true}
        >

        </AgGridReact>
      </div>
    );
  }

  
}



export default Home;
