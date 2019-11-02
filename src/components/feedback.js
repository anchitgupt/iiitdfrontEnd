import React from 'react';
import '../App.css';
import firebase from '../firebase';
import {AgGridReact} from 'ag-grid-react';
import withFirebaseAuth from 'react-with-firebase-auth'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {
  Link
} from 'react-router-dom';

class Feedback extends React.Component {

  constructor(props) {
    super(props);
    this.db = firebase.firestore();
    this.bookingsRef = this.db.collection('feedback');
    this.unsubscribe = null;

    this.state = {
      bookings: [],
      columnDefs: [
        {
          headerName: "Cleanliness",
          field: "ratingCleanliness",
          sortable: true,
          filter: true,
          suppressSizeToFit: true,
          autoHeight: true
        },
         {
             headerName: "Facilities",
             field: "ratingFacilities",
             sortable: true,
             filter: true,
             suppressSizeToFit: true,
             autoHeight: true
         },
          {
              headerName: "Overall Experience",
              field: "ratingOverallExperience",
              sortable: true,
              filter: true,
              suppressSizeToFit: true,
              autoHeight: true
          },
           {
               headerName: "User Email",
               field: "userEmail",
               sortable: true,
               filter: true,
               suppressSizeToFit: true,
               autoHeight: true
           },
           {
               headerName: "Suggesstions",
               field: "suggestions",
               sortable: true,
               filter: true,
               suppressSizeToFit: true,
               autoHeight: true
           },

      ]
    };

  }

  
  onCollectionUpdate = (querySnapshot) => {

   // console.log(querySnapshot.toString());

    let bookingsList = [];

    querySnapshot.forEach((doc) => {

      let {
       ratingCleanliness,
       ratingFacilities,
       ratingOverallExperience,
       suggestions,
       userEmail
      } = doc.data();

      bookingsList.push({
       ratingCleanliness,
       ratingFacilities,
       ratingOverallExperience,
       suggestions,
       userEmail
      });

      bookingsList = bookingsList.reverse();

    });

    this.setState({
      bookings: bookingsList
    })

  }

  componentDidMount() {
    this.unsubscribe = this.bookingsRef.onSnapshot(this.onCollectionUpdate);
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
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
})(Feedback);