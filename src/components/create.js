import React, { Component } from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('booking');
    this.state = {
      rooms: 0,
        key: '',
        from: new Date(),
        to: new Date(),
        arrivalDate: '',
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
        status: '',
        timestamp: '',
        rooomno: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleChangeTo = date => {
    this.setState({
      to: date
    });
  };

  handleChangeFrom = date => {
    this.setState({
      from: date
    });
  };


  getTimeStamp = (time) =>{
    return firebase.firestore.Timestamp.fromDate(time);
  }


  onSubmit = (e) => {
    e.preventDefault();
    const {
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
      from,
      to,
      timestamp,
      status,
      roomno
    } = this.state;
    let fromTime = this.getTimeStamp(from);
    let toTime = this.getTimeStamp(to);
    this.ref.add({
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
       status,
       timestamp,
       roomno
    }).then((docRef) => {
      this.setState({
       from: new Date(),
         to: new Date(),
         arrivalDate: fromTime,
         departureDate: toTime,
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
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { room, checkedIn, name, status } = this.state;
    return (
      <div className="container">
        <hr></hr>
        <h4><Link to="/" className="btn btn-primary">Home</Link></h4>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Add Booking
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" className="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div className="form-group">
                <label htmlFor="room">Room Number:</label>
                <input type="text" className="form-control" name="room" value={room} onChange={this.onChange} placeholder="Room No" />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select name = "status" onChange={this.onChange} value={this.state.status} class="form-control form-control-lg">
              <option value="Requsted">Requsted</option>
            <option value="Approved">Approved</option>
            <option value="CheckedIn">CheckedIn</option>
            <option value="CheckedOut">CheckedOut</option>
              </select>              </div>
              <div className="form-group">
                <label htmlFor="from">From: </label>
                <br></br><DatePicker selected={this.state.from} dateFormat="dd/MM/yyyy" onChange={this.handleChangeFrom}/>  
            </div>
            <div className="form-group">
                <label htmlFor="to">To:</label>
                <br></br><DatePicker selected={this.state.to} dateFormat="dd/MM/yyyy" onChange={this.handleChangeTo}/> 
            </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;