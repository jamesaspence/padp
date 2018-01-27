import {BrowserRouter, Route, Link} from 'react-router-dom';
import React, {Component} from 'react';

/*
 * Route Components
 */
import Home from './Home';
import Test from './Test';

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/test">Test</Link>
            </li>
          </ul>
          <Route exact path="/" component={Home}/>
          <Route exact path="/test" component={Test}/>
        </div>
      </BrowserRouter>
    );
  }
}