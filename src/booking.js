import React from 'react';
import firebase from './firebase';
import { Link } from 'react-router-dom';



class Booking extends React.Component{
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


    componentDidMount() {
        const ref = this.bookingsRef.doc(this.props.match.params.id);
        ref.get().then((doc) => {
          if (doc.exists) {
            this.setState({
                booking: doc.data(),
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
              <h4><Link to="/">Booking List</Link></h4>
                <h3 class="panel-title">
                  {this.state.booking.name}
                </h3>
              </div>
              <div class="panel-body">
                <dl>
                  <dt>Room No:</dt>
                  <dd>{this.state.booking.room}</dd>
                  <dt>Checked In:</dt>
                  <dd>{this.state.booking.checkedIn}</dd>
                </dl>
                <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
                <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        );
      }
    }
    



export default Booking;