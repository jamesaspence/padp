import React, { Component } from 'react';

import LocationChoice from './location/LocationChoice';
import Loader from './location/Loader';
import apiService from '../api/apiService';

export default class Home extends Component {

  constructor(props, context) {
    super(props);
    this.state = {
      isLoading: true,
      selectedLocations: []
    };
    this.onData = this.onData.bind(this);
    this.nextLocation = this.nextLocation.bind(this);
    this.onYes = this.onYes.bind(this);
  }

  onData(results) {
    this.setState({
      isLoading: false,
      results: results,
      locationIndex: 0,
      selectedLocations: []
    });
  }

  componentDidMount() {
    if (this.props.lat && this.props.long) {
      const lat = this.props.lat;
      const lng = this.props.long;
      apiService.getLocations(lat, lng)
        .then(results => this.onData(results));
    }
  }

  onYes() {
    const selectedLocations = this.state.selectedLocations;
    selectedLocations.push(this.state.results.locations[this.state.locationIndex]);
    console.log(selectedLocations);
    this.setState({
      selectedLocations: selectedLocations,
      locationIndex: this.state.locationIndex + 1
    });
  }

  nextLocation() {
    this.setState({
      locationIndex: this.state.locationIndex + 1
    });
  }

  render() {
    if (this.state.locationIndex > 19 || this.state.selectedLocations.length > 4) {
      return (
        <div className="locations">
          Selected locations
          {this.state.selectedLocations.map(((location, i) => <div key={i}>{location.name}</div>))}
        </div>
      );
    }

    return (
        this.state.isLoading ? <Loader/> : <LocationChoice location={this.state.results.locations[this.state.locationIndex]} onNo={this.nextLocation} onYes={this.onYes}/>
    );
  }
}
