import React, { Component } from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './edit.css'

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      from:new Date(),
      to:new Date(),
      arrivalDate:'',
      departureDate:'',
      email: '',
      empno: '',
      name: '',
      paymentType: '',
      roomType: '',
      type: '',
      uid: '',
      vname: '',
      vpurpose: ''
    };
  }

  handleChangeTo = date => {
    this.setState({
      to: date
    });
  };


  onChangeDropdown = val =>{
    this.setState({
      status: val
    });
  }

  handleChangeFrom = date => {
    this.setState({
      from: date
    });
  };

  // while run

  componentDidMount() {
    const ref = firebase.firestore().collection('admin_req').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const booking = doc.data();
        var f = this.dateToString(booking.arrivalDate);
        var t = this.dateToString(booking.departureDate);
        this.setState({
          key: doc.id,
          arrivalDate: f,
          departureDate: t,
          email: booking.email,
          empno: booking.empno,
          name: booking.name,
          paymentType: booking.paymentType,
          roomType: booking.roomType,
          type: booking.type,
          uid: booking.uid,
          vname: booking.vname,
          vpurpose: booking.vpurpose,
          from:f,
          to: t,
        });
      } else {
        console.log("No such document!");
      }
    });
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


  // On submit
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    // debugger
    this.setState({booking:state});
  }

  getTimeStamp = (time) =>{
    return firebase.firestore.Timestamp.fromDate(time);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { arrivalDate, departureDate, email, empno, name, paymentType, roomType, type, uid, vname, vpurpose, from ,to } = this.state;
    let fromTime = this.getTimeStamp(from);
    let toTime = this.getTimeStamp(to);
    console.log("onSubmit", fromTime);
    console.log("onSubmit", toTime);
    const updateRef = firebase.firestore().collection('bookings').doc(this.state.key);
    updateRef.set({
        // room,
        // name,
        // status,
        // from:fromTime,
        // to:toTime
      arrivalDate: fromTime,
      departureDate: toTime,
      email,
      empno,
      name,
      paymentType,
      roomType,
      type,
      uid,
      vname,
      vpurpose
    }).then((docRef) => {
      this.setState({
        from:new Date(),
        to:new Date(),
        arrivalDate:'',
        departureDate:'',
        email: '',
        empno: '',
        name: '',
        paymentType: '',
        roomType: '',
        type: '',
        uid: '',
        vname: '',
        vpurpose: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }


  render() {
    return (
        <div class="container">
          <hr></hr>
          <h2><Link to="/" className="btn btn-primary" >Home</Link></h2>
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">
                EDIT BOOKING
              </h3>
            </div>
            <div class="panel-body">
              <form onSubmit={this.onSubmit}>
                <div class="form-group">
                  <label for="room">Room:</label>
                  <input type="text" class="form-control" name="room" value={this.state.room}   placeholder="Room" />
                </div>

                <div class="form-group">
                  <label for="name">Status:</label>
                  <select name = "status" onChange={this.onChange} value={this.state.status} class="form-control form-control-lg">
                    <option value="Requsted">Requsted</option>
                    <option value="Approved">Approved</option>
                    <option value="CheckedIn">CheckedIn</option>
                    <option value="CheckedOut">CheckedOut</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="name">Name:</label>
                  <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder="Name" />
                </div>

                <div className="form-group">
                  <label htmlFor="from">From: </label>
                  <br></br><DatePicker selected={this.state.from} dateFormat="dd/MM/yyyy" onChange={this.handleChangeFrom}/>
                </div>
                <div className="form-group">
                  <label htmlFor="to">To:</label>
                  <br></br><DatePicker selected={this.state.to} dateFormat="dd/MM/yyyy" onChange={this.handleChangeTo}/>
                </div>

                <button type="submit" class="btn btn-success">Submit</button>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

export default Edit;