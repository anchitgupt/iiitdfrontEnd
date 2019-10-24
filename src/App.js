import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './home';
import Booking from './booking';

class App extends Component {
  render() {
    return (
    <Router>
        <div>
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/booking/:id' component={Booking} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;