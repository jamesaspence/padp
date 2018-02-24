import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import LocationChoice from './location/LocationChoice';
import Loader from './Loader';
import apiService from '../api/apiService';

export default class Home extends Component {

  constructor(props) {
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
      //TODO switch back to dynamic
      /*
       * Coordinates for 5th ward, for testing
       */
      const lat = 43.030129;
      const lng = -87.911980;
      apiService.getLocations(lat, lng)
        .then(results => this.onData(results));
    }
  }

  onYes() {
    const selectedLocations = this.state.selectedLocations;
    selectedLocations.push(this.state.results.locations[this.state.locationIndex]);
    console.log(selectedLocations);
    const newState = {
      selectedLocations: selectedLocations,
      locationIndex: this.state.locationIndex + 1
    };

    if (newState.locationIndex > 19 || newState.selectedLocations.length > 4) {
      newState.isLoading = true;
      apiService.createNewVote(newState.selectedLocations)
        .then(result => {
          console.log('returned result!');
          console.log('redirecting hopefully');
          console.log(result);
          this.setState({sessionId: result.sessionId})
        });
    }

    this.setState(newState);
  }

  nextLocation() {
    this.setState({
      locationIndex: this.state.locationIndex + 1
    });
  }

  render() {
    if (this.state.sessionId) {
      console.log('session ID is set!');
      console.log('redirecting.');
      const sessionId = this.state.sessionId.startsWith('/') ? this.state.sessionId : `/${this.state.sessionId}`;
      return <Redirect to={`/vote${sessionId}`}/>;
    }

    return (
      <div className="column is-half">
        {
          this.state.isLoading ? <Loader/> : <LocationChoice location={this.state.results.locations[this.state.locationIndex]} onNo={this.nextLocation} onYes={this.onYes}/>
        }
      </div>
    );
  }
}
