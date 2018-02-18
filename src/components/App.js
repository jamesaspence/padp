import {BrowserRouter, Route} from 'react-router-dom';
import React, {Component} from 'react';

import './App.css';

import Loader from './Loader';

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

  componentDidMount() {
    const newState = {
      locationRequested: true
    };

    if (!('geolocation' in window.navigator)) {
      newState.locationError = true;
      newState.errorMessage = 'Unable to retrieve location - no navigator available.';
      this.setState(newState);
      return;
    }

    window.navigator.geolocation.getCurrentPosition(position => {
      newState.lat = position.coords.latitude;
      newState.long = position.coords.longitude;
      this.setState(newState);
    }, e => {
      newState.locationError = true;
      newState.errorMessage = e.message;
      this.setState(newState);
    });
  }

  render() {
    let children;

    if (!this.state.locationRequested) {
      children = (
        <div className="column is-half">
          <Loader/>
        </div>
      );
    } else if (this.state.locationError) {
      children = (
        <div className="column is-half">
          <div className="card location-error">
            <div className="card-header">
              <h3 className="card-header-title">Uh Oh!</h3>
            </div>
            <div className="card-content">
              <p>Something went wrong retrieving your location.</p>
              <p>"{this.state.errorMessage}"</p>
            </div>
          </div>
        </div>
      );
    } else {
      const render = routeProps => <Home {...routeProps} lat={this.state.lat} long={this.state.long} />;
      children = [
        <Route key="0" exact path="/" render={render}/>,
        <Route key="1" path="/vote/:sessionId" component={Voter}/>
      ];
    }

    return (
      <BrowserRouter>
        <div>
          <Header/>
          <div className="columns is-centered">
            {children}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}