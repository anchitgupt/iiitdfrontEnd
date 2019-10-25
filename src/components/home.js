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
            headerName: "Room No", field: "room",sortable: true,filter:true,
          },
          {
          headerName: "ID", field: "bId",sortable: true,filter:true,
          cellRenderer: (cellValue) =>
              `<a href="/show/${cellValue.value}" >${cellValue.value}</a>`
        }, {
          headerName: "Name", field: "name",sortable: true,filter:true
        }, {
          headerName: "Status", field: "status",sortable: true ,filter:true
        },
        {
          headerName: "From", field: "from",sortable: true ,filter:true,
        },
        {
          headerName: "To", field: "to",sortable: true ,filter:true,
        },
      ]
      }
  }

    dateToString=(date)=>{
      var dd = date.getDate();
      var mm = date.getMonth() + 1;

      var yyyy = date.getFullYear();
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
      
       var toDate = this.dateToString((doc.get('to')).toDate());
       var fromDate = this.dateToString((doc.get('from')).toDate());
      
      let { checkedIn, room, name, status, from, to  } = doc.data();
      bookingsList.push({
        checkedIn,   
        bId:doc.id, 
        room, 
        name, 
        status,
        from:fromDate,
        to: toDate
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
        height: '500px', 
        width: '1200px' }} 
      >
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
