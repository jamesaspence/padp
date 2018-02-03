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
import Error from './Error';

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
    let child;

    if (!this.state.locationRequested) {
      child = (
        <div className="column is-half">
          <Loader/>
        </div>
      );
    } else if (this.state.locationError) {
      child = (
        <div className="column is-half">
          <Error errorMessage={this.state.errorMessage}/>
        </div>
      );
    } else {
      const render = routeProps => <Home {...routeProps} lat={this.state.lat} long={this.state.long} />;
      child = <Route exact path="/" render={render}/>;
    }

    return (
      <BrowserRouter>
        <div>
          <Header/>
          <div className="columns is-centered">
            {child}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}