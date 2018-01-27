import React, { Component } from 'react';

import LocationChoice from './location/LocationChoice';
import Loader from './location/Loader';
import apiService from '../api/apiService';

export default class Home extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: true
    };
    this.onData = this.onData.bind(this);
  }

  onData(results) {
    this.setState({
      isLoading: false,
      results: results
    });
  }

  componentDidMount() {
    const lat = '43.030129';
    const lng = '-87.911980';
    apiService.getLocations(lat, lng)
      .then(results => this.onData(results));
  }
  //TODO load in API locations
  //TODO show loader in the meantime maybe...?

  render() {
    //TODO make dynamic
    //TODO move call to componentDidMount
    return (
      <div className="columns is-centered">
        <div className="column is-half">
          {this.state.isLoading ? <Loader/> : <LocationChoice location={this.state.results.locations[0]}/>}
        </div>
      </div>
    );
  }
}
