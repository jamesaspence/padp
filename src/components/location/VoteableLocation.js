import React, {Component} from 'react';

import './VoteableLocation.css';

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
      <div className="card">
        <div className="card-content">
          <h3 className="title">Title!</h3>
          <div className="address-content">
            <p className="address-one">Content Line One</p>
          </div>
        </div>
        <div className="card-footer">
          <a className={voterClassNames} onClick={this.changeVote}>{this.state.votedFor ? 'Voted' : 'Vote'}</a>
        </div>
      </div>
    )
  }
}