import React from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';



class Show extends React.Component{
    constructor(props){

        super(props);
        this.db = firebase.firestore();
        this.bookingsRef = this.db.collection('booking');
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
          status:'',
          timestamp:'',
          roomno:'',
          };
    }

  dateToString = (date) => {
    date = date.toDate().toLocaleDateString();
    console.log("Date: ", date);
    var dd = date.split("/")[0];
    var mm = parseInt(date.split("/")[1]);
    console.log(date.split("/"));
    var yyyy = date.split("/")[2];
    return dd + '/' + mm + '/' + yyyy;
  }


    componentDidMount() {
      const ref = this.bookingsRef.doc(this.props.match.params.id);
      ref.get().then((doc) => {
        if (doc.exists) {
          let data = {};
          data.key = doc.get('key');
          data.name = doc.get('name');
          data.status = doc.get('status');
          data.arrivalDate = this.dateToString(doc.get('arrivalDate'));
          data.departureDate = this.dateToString(doc.get('departureDate'));
          data.email = doc.get('email');
          data.empno = doc.get('empno');
          data.paymentType = doc.get('paymentType');
          data.roomType = doc.get('roomType');
          data.type = doc.get('type');
          data.uid = doc.get('uid');
          data.vname = doc.get('vname');
          debugger;
          data.vpurpose = doc.get('vpurpose');
          data.timestamp = doc.get("timestamp");
          data.roomno = doc.get("roomno");

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
        firebase.firestore().collection('booking').doc(this.props.match.params.id).update({
            status:"Cancelled"
        }).then(() =>{
          this.props.history.push("/");
        }).catch((error)=>{
          console.error("Error removing document: ", error);
        });
      }

      delete(id){
      // TODO to remove
        firebase.firestore().collection('booking').doc(this.props.match.params.id).delete().then(() => {
          console.log("Document successfully deleted!");
          this.props.history.push("/");
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
      }

      render() {
        return (
          <div class="container well">
            <h2><Link to="/" className="btn btn-primary">Home</Link></h2>
            <hr></hr>
 <form>
  <div class="form-group row">
    <label for="name" class="col-sm-2 col-form-label font-weight-bold">Name</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control-plaintext" id="name" value={this.state.booking.name}/>
    </div>
  </div>
  <div class="form-group row">
    <label for="name" class="col-sm-2 col-form-label">Status</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control-plaintext" id="status" value={this.state.booking.status}/>
    </div>
  </div>
  <div class="form-group row">
    <label for="name" class="col-sm-2 col-form-label">Type</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control-plaintext" id="type" value={this.state.booking.type}/>
    </div>
  </div>
  <div class="form-group row">
    <label for="name" class="col-sm-2 col-form-label">Arrival Date</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control-plaintext" id="arrivalDate" value={this.state.booking.arrivalDate}/>
    </div>
  </div>
  <div class="form-group row">
    <label for="name" class="col-sm-2 col-form-label">Departure Date</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control-plaintext" id="departureDate" value={this.state.booking.departureDate}/>
    </div>
  </div>
  {/* <div class="form-group row">
    <label for="name" class="col-sm-2 col-form-label">Payment type</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={this.state.booking.paymentType}/>
    </div>
  </div> */}
  <div class="form-group row">
    <label for="name" class="col-sm-2 col-form-label">Visitor Name</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control-plaintext" id="vname" value={this.state.booking.vname}/>
    </div>
  </div>
  <div class="form-group row">
    <label for="name" class="col-sm-2 col-form-label">Visitor Purpose</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control-plaintext text-justify" id="vpurpose" value={this.state.booking.vpurpose}/>
    </div>
  </div>
   <div class="form-group row">
    <div class="col-sm-10">
      <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
    </div>
  </div>
  
  {/* <div class="form-group row">
    <div class="col-sm-10">
      <button onClick = {this.delete.bind(this, this.state.key)} class = "btn btn-danger" > Delete </button>
    </div>
  </div> */}
</form>
           

            {/* <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">
                  Name:{this.state.booking.name}
                </h3>
              </div>
              
              <div class="panel-body">
                <dl>
                  <dt>Name:</dt>
                  <p>{this.state.booking.name}</p>
                  <dt>Status:</dt>
                  <dd>{this.state.booking.status}</dd>
                  <dt>Room No:</dt>
                  <dd>{this.state.booking.roomno}</dd>
                  <dt>From:</dt>
                  <dd>{this.state.booking.arrivalDate}</dd>
                  <dt>To:</dt>
                  <dd>{this.state.booking.departureDate}</dd>
                  <dt> Payment: </dt> 
                  <dd> {this.state.booking.paymentType}</dd>
                  <dt>Visitor name:</dt>
                  <dd>{this.state.booking.vname}</dd>
                  <dt> Visitor Purpose: </dt> 
                  <dd> {this.state.booking.vpurpose}</dd>
                </dl>
                <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
                 <button onClick = {this.cancel.bind(this, this.state.key)} class = "btn btn-primary" > Cancel </button>
                 <button onClick = {this.delete.bind(this, this.state.key)} class = "btn btn-danger" > Delete </button>
              </div>
            </div> */}
          </div>
        );
      }
    }
    



export default Show;