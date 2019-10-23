import React from 'react';
import './App.css';
import * as firebase from 'firebase'
import {DB_CONFIG} from './firebase.js'
import Booking from './booking'

class compToPrint extends React.Component{
  constructor(props){
      super(props);
      firebase.initializeApp(DB_CONFIG);
      this.db = firebase.firestore();
      this.bookingsRef = this.db.collection('bookings');
      this.state = {
        bookings : []
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

  render(){
    return(
      <div class="list-group">
      {this.state.bookings.map((booking)=>{
        return(
        <Booking name={booking.name} />  
      )})}
      </div>
    )  
}

  
}



export default compToPrint;
