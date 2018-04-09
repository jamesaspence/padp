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
import Voter from './Voter';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      locationRequested: false,
      locationError: false,
      errorMessage: null,
      lat: null,
      long: null
    };
  }

  render() {
    const renderHome = routeProps => <Home {...routeProps} lat={this.state.lat} long={this.state.long} />;
    return (
      <BrowserRouter>
        <div className="content-root">
          <Header/>
          <Route key="0" exact path="/" render={renderHome}/>
          <Route key="1" path="/vote/:sessionId" component={Voter}/>
        </div>
      </BrowserRouter>
    );
  }
}