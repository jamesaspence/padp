import React, {Component} from 'react';
import io from 'socket.io-client';

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
    socket.on('userJoined', () => this.setState({users: this.state.users + 1}));
    socket.on('userLeft', () => this.setState({users: this.state.users - 1}));
  }

  render() {
    return (
      <div>
        {this.props.match.params.sessionId}
        <div>{this.state.users}</div>
      </div>
    );
  }
}