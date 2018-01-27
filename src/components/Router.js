import {BrowserRouter, Route} from 'react-router-dom';
import React, {Component} from 'react';

/*
 * Route Components
 */
import Home from './Home';

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home}/>
        </div>
      </BrowserRouter>
    );
  }
}