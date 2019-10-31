import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/home';
import Show from './components/show';
import Edit from './components/edit';
import Create from './components/create';
import CheckOut from './components/checkout';
import Login from './components/login';



ReactDOM.render(<Router>
    <div>
      <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/show/:id' component={Show} />
          <Route path='/edit/:id' component={Edit} />
          <Route path='/create' component={Create} />
          <Route path='/checkout' component={CheckOut} />
           <Route path='/login' component={Login} />
      </Switch>
    </div>
  </Router>, document.getElementById('root'));

serviceWorker.unregister();
