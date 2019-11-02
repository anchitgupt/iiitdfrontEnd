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
      rooms : 0,
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
      vpurpose: '',
      status: '',
      timestamp: '',
      rooomno: '',
      status:''
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

  getRoomsAvailable = (arrivalDate, departureDate) => {
    firebase.firestore().collection('booking').where("arrivalDate", "<=", arrivalDate).get().then((doc) =>{
    });
  };

  // while run

  componentDidMount() {
    const ref = firebase.firestore().collection('booking').doc(this.props.match.params.id);

    ref.get().then((doc) => {
      // TODO to add condition for checked out
      if (doc.exists) {
        const booking = doc.data();
        console.log("booking.arrivalDate", booking.arrivalDate);
        this.state.rooms = this.getRoomsAvailable(booking.arrivalDate, booking.departureDate)
        var f = this.dateToString(booking.arrivalDate);
        console.log("f: " , f);
        var t = this.dateToString(booking.departureDate);
        //debugger
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
          roomno:booking.roomno,
          timestamp:booking.timestamp
        });

      } else {
        console.log("No such document!");
      }

    });
  }

  dateToString=(date)=>{
    date = date.toDate();
    console.log("Date: ",date);
    return date;
  };


  // On submit
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    // debugger
    this.setState({booking:state});
  }

  getTimeStamp = (time) =>{
    var f = firebase.firestore.Timestamp.fromDate(time);
    console.log("Timestamp:", f);
    return f;
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { arrivalDate, departureDate, email, empno, name, paymentType, roomType, type, uid, vname, vpurpose, from ,to,timestamp, status, roomno } = this.state;
    let fromTime = this.getTimeStamp(from);
    let toTime = this.getTimeStamp(to);
    let toStatus = (this.state.status).toString();
    console.log("onSubmit", fromTime);
    console.log("onSubmit", toTime);
    debugger
    const updateRef = firebase.firestore().collection('booking').doc(this.state.key);
    
    updateRef.update({
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
      vpurpose,
      status: toStatus,
      timestamp,
      roomno
    }).then((docRef) => {
      this.setState({
        from:new Date(),
        to:new Date(),
        arrivalDate:fromTime,
        departureDate:toTime,
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
          <h2><Link to="/" className="btn btn-primary" >Home</Link></h2>
           <hr></hr>
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">
                Edit Booking
              </h3>
            </div>
            <div class="panel-body">
              <form onSubmit={this.onSubmit}>
                
                <div class="form-group">
                  <label for="roomno">Room:</label>
                  <input type="text" class="form-control" name="roomno" value={this.state.roomno} onChange={this.onChange}  placeholder="Room" />
                </div>

                <div class="form-group">
                  <label for="name">Status:</label>
                  <select name="status" onChange={this.onChange} value={this.state.status} class="form-control form-control-lg">
                    <option value="Requsted">Requsted</option>
                    <option value="Approved">Approved</option>
                    <option value="CheckedIn">CheckedIn</option>
                    <option value="CheckedOut">CheckedOut</option>
                    <option value="CheckedIn">CheckedIn</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="name">Name: </label>
                  <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder="Name" />
                </div>

                <div className="form-group">
                  <label htmlFor="from">From: </label>
                  <br></br><DatePicker selected={this.state.from} dateFormat="dd/MM/yyyy" onChange={this.handleChangeFrom}/>
                </div>
                <div className="form-group">
                  <label htmlFor="to">To: </label>
                  <br></br>
                  <DatePicker selected={this.state.to} dateFormat="dd/MM/yyyy" onChange={this.handleChangeTo}/>
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