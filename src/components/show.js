import React from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';



class Show extends React.Component{
    constructor(props){

        super(props);
        //const {id} = props.match.params
        this.db = firebase.firestore();
        this.bookingsRef = this.db.collection('bookings');
        this.state = {
            booking: {},
            key: ''
          };
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


    componentDidMount() {
        const ref = this.bookingsRef.doc(this.props.match.params.id);
        ref.get().then((doc) => {
          if (doc.exists) {
            let data = {}
            data.name = doc.name;
            data.status = doc.status;
            data.room = doc.room;
            data.checkedIn = doc.checkedIn
            data.from =  this.dateToString((doc.get('from')).toDate());
            data.to =  this.dateToString((doc.get('to')).toDate());
            this.setState({
                booking: data,
                key: doc.id,
                isLoading: false
            });
          } else {
            console.log("No such document!");
          }
        });
      }



      delete(id){
        firebase.firestore().collection('bookings').doc(id).delete().then(() => {
          console.log("Document successfully deleted!");
          this.props.history.push("/")
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
      }

      render() {
        return (
          <div class="container">
            <div class="panel panel-default">
              <div class="panel-heading">
              <h4><Link to="/" className="btn btn-primary">Booking List</Link></h4>
                <h3 class="panel-title">
                  {this.state.booking.name}
                </h3>
              </div>
              <div class="panel-body">
                <dl>
                <dt>Name:</dt>
                  <dd>{this.state.booking.name}</dd>
                  <dt>Status:</dt>
                  <dd>{this.state.booking.status}</dd>
                  <dt>Room No:</dt>
                  <dd>{this.state.booking.room}</dd>
                  <dt>Checked In:</dt>
                  <dd>{this.state.booking.checkedIn}</dd>
                  <dt>From:</dt>
                  <dd>{this.state.booking.from}</dd>
                  <dt>To:</dt>
                  <dd>{this.state.booking.to}</dd>
                </dl>
                <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
                <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        );
      }
    }
    



export default Show;