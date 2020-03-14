import React, {Component} from 'react';

import './VoteableLocation.scss';

export default class VoteableLocation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      votedFor: false
    };

    this.changeVote = this.changeVote.bind(this);
  }

  changeVote() {
    this.setState({
      votedFor: (!this.state.votedFor)
    });
  }

  render() {
    let voterClassNames = "card-footer-item voter-button";

    if (this.state.votedFor) {
      voterClassNames+= " voted";
    }

    //TODO add voter button to bottom
    return (
      <div className="card voter-location">
        <div className="card-content">
          <h3 className="title">{this.props.title}</h3>
          <div className="address-content">
            <p className="address-one">#{this.props.number}</p>
          </div>
        </div>
        <div className="card-footer">
          <div className={voterClassNames} onClick={this.changeVote}>{this.state.votedFor ? 'Voted' : 'Vote'}</div>
        </div>
      </div>
    )
  }
}