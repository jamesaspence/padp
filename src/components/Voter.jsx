import React, {Component} from 'react';

export default class Voter extends Component {
  render() {
    return (
      <div>{this.props.match.params.sessionId}</div>
    );
  }
}