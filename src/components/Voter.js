import React, {Component} from 'react';
import io from 'socket.io-client';

import LocationSidebar from './location/LocationSidebar';
import Map from './Map';

export default class Voter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //TODO retrieve current user count
      users: 0
    };
  }

  componentDidMount() {
    const sessionId = this.props.match.params.sessionId;
    //TODO remove hardcoded URL
    let socket = io('http://localhost:5000/' + sessionId);
    socket.on('userCount', e => this.setState({users: e.count}));
  }

  render() {
    return (
      [
        <LocationSidebar/>,
        <Map/>
      ]
    );
  }
}