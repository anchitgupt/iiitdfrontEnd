import React from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';



class Show extends React.Component{
    constructor(props){

        super(props);
        //const {id} = props.match.params
        this.db = firebase.firestore();
        this.bookingsRef = this.db.collection('admin_req');
        this.state = {
            booking: {},
            key: '',
            arrivalDate:'',
              departureDate: '',
              email: '',
              empno: '',
              name: '',
              paymentType: '',
              roomType: '',
              type: '',
              uid: '',
              vname: '',
              vpurpose: '',
          status:''
          };
    }

  dateToString=(date)=>{

    console.log("Nonosecond: ",);
    date = date.toDate().toLocaleDateString();//new Date(date.nanoseconds).toLocaleDateString();
    console.log("Date: ",date);

    var dd = date.split("/")[0];
    var mm = parseInt(date.split("/")[1]);
    var yyyy = date.split("/")[2];
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
          data.name = doc.get('name');
          data.status = doc.get('status');
          data.room = doc.get('room');
          data.arrivalDate = this.dateToString(doc.get('arrivalDate'));
          data.departureDate = this.dateToString(doc.get('departureDate'));
          data.email = doc.get('email');
          data.empno = doc.get('empno');
          data.paymentType = doc.get('paymentType');
          data.roomType = doc.get('roomType');
          data.type = doc.get('type');
          data.uid = doc.get('uid');
          data.vname = doc.get('vname');
          data.vpurpose = doc.get('vpurpose');
          data.show = doc.get("status");

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


      cancel(id) {
        // TODO to remove

        firebase.firestore().collection('admin_req').doc(id).update({
            status:"cancelled"
        }).then(() =>{
          this.props.history.push("/");
        }).catch((error)=>{
          console.error("Error removing document: ", error);
        });
      }

      delete(id){
      // TODO to remove
        firebase.firestore().collection('admin_req').doc(id).delete().then(() => {
          console.log("Document successfully deleted!");
          this.props.history.push("/");
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
      }

      render() {
        return (
          <div class="container">
            <hr/>
            <h2><Link to="/" className="btn btn-primary">Home</Link></h2>
            <div class="panel panel-default">
              <div class="panel-heading">
              
                <h3 class="panel-title">
                  Name:{this.state.booking.name}
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
                  <dt>From:</dt>
                  <dd>{this.state.booking.arrivalDate}</dd>
                  <dt>To:</dt>
                  <dd>{this.state.booking.departureDate}</dd>
                  < dt > Payment: </dt> 
                  <dd> {this.state.booking.paymentType}</dd>
                </dl>
                <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
                 < button onClick = {
                   this.cancel.bind(this, this.state.key)
                 }
                 class = "btn btn-primary" > Cancel </button>
                <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        );
      }
    }
    



export default Show;