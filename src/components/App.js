import {BrowserRouter, Route} from 'react-router-dom';
import React, {Component} from 'react';

/*
 * Include Components
 */
import Header from './include/Header';

/*
 * Route Components
 */
import Home from './Home';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header/>
          <Route exact path="/" component={Home}/>
        </div>
      </BrowserRouter>
    );
  }
}