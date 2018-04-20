import React, {Component} from 'react';
import io from 'socket.io-client';
import apiService from '../api/apiService';

import LocationSidebar from './location/LocationSidebar';
import Map from './Map';
import Loader from './Loader';

import {fitBounds} from 'google-map-react/utils';

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
    this.findMapBounds = this.findMapBounds.bind(this);
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
      bounds: this.findMapBounds(votedLocations),
      locationsLoaded: true
    });
  }

  findMapBounds(locations) {
    const lats = [];
    const longs = [];

    locations.forEach(location => {
      const lat = location.data.geometry.location.lat;
      const lng = location.data.geometry.location.lng;

      lats.push(lat);
      longs.push(lng);
    });

    //long is EW
    //lat is NS
    //max long is east
    //max lat is N

    //We need SW and NE
    //NE = max long/lat, min long/lat
    const minLat = Math.min(...lats);
    const minLng = Math.min(...longs);
    const maxLat = Math.max(...lats);
    const maxLng = Math.max(...longs);

    return {
      ne: {
        lat: maxLat,
        lng: maxLng
      },
      sw: {
        lat: minLat,
        lng: minLng
      }
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
        <Map center={this.state.center} bounds={this.state.bounds} locations={this.state.locations}/>
      </div>
    );
  }
}
