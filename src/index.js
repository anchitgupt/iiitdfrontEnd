import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/home';
import Show from './components/show';
import Edit from './components/edit';
import Create from './components/create';


//import { BrowserRouter } from 'react-router-dom'


ReactDOM.render(<Router>
    <div>
      <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/show/:id' component={Show} />
          <Route path='/edit/:id' component={Edit} />
          <Route path='/create' component={Create} />
      </Switch>
    </div>
  </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
