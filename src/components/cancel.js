import React from 'react';
import '../App.css';
import firebase from '../firebase';
import {
    AgGridReact
} from 'ag-grid-react';
import withFirebaseAuth from 'react-with-firebase-auth'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {
    Link
} from 'react-router-dom';

class Cancel extends React.Component {

    constructor(props) {
        super(props);
        this.db = firebase.firestore();
        this.bookingsRef = this.db.collection('booking');
        this.unsubscribe = null;

        this.state = {
            bookings: [],
            columnDefs: [{
                    headerName: "",
                    field: "bId",
                    suppressSizeToFit: true,
                    width: 80,
                    autoHeight: true,
                    cellRenderer: (cellValue) =>
                        `<a href="/show/${cellValue.value}" id="${cellValue.value}" class="btn btn-info" role="button">Edit</a>`
                },
                {
                    headerName: "Room No",
                    field: "roomno",
                    sortable: true,
                    filter: true,
                    suppressSizeToFit: true,
                    width: 100,
                    autoHeight: true
                },
                {
                    headerName: "Room Type",
                    field: "roomType",
                    sortable: true,
                    filter: true,
                    suppressSizeToFit: true,
                    autoHeight: true,
                    width: 100,
                    cellRenderer: (cellValue) => `<Text style="text-transform:capitalize">${cellValue.value}</Text>`
                },

                {
                    headerName: "Requester",
                    field: "name",
                    sortable: true,
                    filter: true,
                    suppressSizeToFit: true,
                    width: 150,
                    autoHeight: true
                }, {
                    headerName: "Status",
                    field: "status",
                    sortable: true,
                    filter: true,
                    suppressSizeToFit: true,
                    width: 100,
                    autoHeight: true
                }, {
                    // TODO to convert report time to checkout time
                    headerName: "Report Time",
                    field: "timestamp",
                    sortable: true,
                    filter: true,
                    suppressSizeToFit: true,
                    width: 190,
                    autoHeight: true
                },
                {
                    headerName: "From",
                    field: "arrivalDate",
                    sortable: true,
                    filter: true,
                    suppressSizeToFit: true,
                    width: 110,
                    autoHeight: true
                },
                {
                    headerName: "To",
                    field: "departureDate",
                    sortable: true,
                    filter: true,
                    suppressSizeToFit: true,
                    width: 110,
                    autoHeight: true
                },
                {
                    headerName: "Visitor Name",
                    field: "vname",
                    sortable: true,
                    filter: true,
                    suppressSizeToFit: true,
                    autoHeight: true
                },
                {
                    headerName: "Visitor Purpose",
                    field: "vpurpose",
                    sortable: true,
                    filter: true,
                    suppressSizeToFit: true,
                    autoHeight: true
                },

            ]
        };

    }

    dateToString = (date) => {

        date = date.toDate().toLocaleDateString();
        var dd = date.split("/")[0];
        var mm = parseInt(date.split("/")[1]);
        console.log(date.split("/"));
        var yyyy = date.split("/")[2];
        return dd + '/' + mm + '/' + yyyy;
    }

    dateTimeToString = (date) => {


        date = date.toDate();
        return date.toString().substring(0, 25);
    }

    onCollectionUpdate = (querySnapshot) => {

        console.log(querySnapshot.toString());

        let bookingsList = [];

        querySnapshot.forEach((doc) => {

            if (doc.get('status') == 'Cancelled') {

                var arrivalDat = this.dateToString(doc.get('arrivalDate'));
                var departureDat = this.dateToString(doc.get('departureDate'));

                let {
                    arrivalDate,
                    departureDate,
                    email,
                    empno,
                    name,
                    paymentType,
                    roomType,
                    type,
                    uid,
                    vname,
                    vpurpose,
                    status,
                    timestamp,
                    roomno
                } = doc.data();
                bookingsList.push({
                    bId: doc.id,
                    arrivalDate: arrivalDat,
                    departureDate: departureDat,
                    email,
                    empno,
                    name,
                    paymentType: doc.get('paymentType').toString(),
                    roomType,
                    type,
                    uid,
                    vname,
                    vpurpose,
                    status,
                    timestamp: this.dateTimeToString(doc.get('timestamp')),
                    roomno
                });

                bookingsList = bookingsList.reverse();
            }


        });

        this.setState({
            bookings: bookingsList
        })

    }

    componentDidMount() {
        this.unsubscribe = this.bookingsRef.onSnapshot(this.onCollectionUpdate);
        firebase.auth().onAuthStateChanged(user => {
            this.setState({
                isSignedIn: !!user
            })
            if (user)
                console.log("user", user);
            else
                this.props.history.push('/login');
        });
    }

    //  paste
   render() {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <div 
              className="ag-theme-balham"
              style={{ 
              height: '460px', 
              width: '100%' }}
            >

              
              <hr></hr>
{/* 
              <Link to="/create" className="btn btn-primary">Add Booking</Link> */}
               <button onClick={signOut} class="btn btn-danger w3-margin" id="logout"><Link to="/login">Log Out</Link></button>
               
               <hr></hr>
              <AgGridReact
              
                pagination = {true}
                columnDefs={this.state.columnDefs}
                defaultColDef = {{resizable:true}}
                colResizeDefault = {'shift'}
                rowData={this.state.bookings}
                enableRangeSelection={true}
                enableRangeSelection={true}
                animateRows={true}
              >
      
              </AgGridReact>
            </div>
             
          
        </header>
      </div>
    );
  }
}
const firebaseAppAuth = firebase.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Cancel);