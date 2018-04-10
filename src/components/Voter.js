import React, {Component} from 'react';
import io from 'socket.io-client';
import apiService from '../api/apiService';

import LocationSidebar from './location/LocationSidebar';
import Map from './Map';
import Loader from './Loader';

export default class Voter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: 0,
      locationsLoaded: false,
      locations: [],
      center: {}
    };

    this.onLocationData = this.onLocationData.bind(this);
    this.findAverageLatAndLong = this.findAverageLatAndLong.bind(this);
  }

  componentDidMount() {
    const sessionId = this.props.match.params.sessionId;
    //TODO remove hardcoded URL
    let socket = io('http://localhost:5000/' + sessionId);
    socket.on('userCount', e => this.setState({users: e.count}));

    apiService.getVoterData(sessionId)
      .then(response => this.onLocationData(response.rawResponse));
  }

  onLocationData(locations) {
    let votedLocations = locations.map(location => ({
      //TODO return votes w/ response
      votes: 0,
      data: location
    }));

    this.setState({
      locations: votedLocations,
      center: this.findAverageLatAndLong(locations),
      locationsLoaded: true
    });
  }

  findAverageLatAndLong(rawLocations) {
    let totalLat = 0;
    let totalLong = 0;
    rawLocations.forEach(location => {
      totalLat+= location.geometry.location.lat;
      totalLong+= location.geometry.location.lng;
    });

    const totalNumberOfUsers = rawLocations.length;
    return {
      lat: totalLat / totalNumberOfUsers,
      lng: totalLong / totalNumberOfUsers
    };
  }

  render() {
    if (!this.state.locationsLoaded) {
      return (
        <div className="columns is-centered">
          <div className="column is-half">
            <Loader noBoxShadow={true}/>
          </div>
        </div>
      )
    }

    return (
      <div className="columns">
        <LocationSidebar locations={this.state.locations}/>
        <Map center={this.state.center} locations={this.state.locations}/>
      </div>
    );
  }
}