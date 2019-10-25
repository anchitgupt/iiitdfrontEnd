import React, { Component } from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('bookings');
    this.state = {
      room: '',
      checkedIn: '',
      name:'',
      status:'',
      from:new Date(),
      to:new Date()
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

    const { room, checkedIn, name, status, from, to } = this.state;
    let fromTime = this.getTimeStamp(from);
    let toTime = this.getTimeStamp(to);
    this.ref.add({
      room,
        checkedIn,
        name,
        status,
        from:fromTime,
        to:toTime
    }).then((docRef) => {
      this.setState({
        room: '',
      checkedIn: '',
      name:'',
      status:'',
      from:new Date(),
      to:new Date()
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
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              ADD Booking
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/" className="btn btn-primary">Booking List</Link></h4>
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
                <input type="text" className="form-control" name="status" value={status} onChange={this.onChange} placeholder="Status" />
              </div>
              <div className="form-group">
                <label htmlFor="author">Checked In:</label>
                <input type="text" className="form-control" name="checkedIn" value={checkedIn} onChange={this.onChange} placeholder="checked In" />
              </div>
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