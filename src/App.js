import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/home';
import Booking from './components/booking';
import timestampToDate from 'timestampToDate';

class App extends Component {
  render() {
    return (
    <Router>
        <div>
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/show/:id' component={Booking} />
              <Route path='/edit/:id' component={Edit} />
              <Route path='/create' component={Create} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;