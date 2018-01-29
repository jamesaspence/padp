import {BrowserRouter, Route} from 'react-router-dom';
import React, {Component} from 'react';

import Loader from './location/Loader';

/*
 * Include Components
 */
import Header from './include/Header';

/*
 * Route Components
 */
import Home from './Home';

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
      console.log('success!');
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
      child = <Loader/>;
    } else if (this.state.locationError) {
      child = (
        <div className="card">
          <div className="card-content">
            <h3 className="title">Uh oh!</h3>
            <p>Something went wrong retrieving your location.</p>
            <p>"{this.state.errorMessage}"</p>
          </div>
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
            <div className="column is-half">
              {child}
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}