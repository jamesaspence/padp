import React, {Component} from 'react';

import VoteableLocation from './VoteableLocation';

import './LocationSidebar.css';

export default class LocationSidebar extends Component {
  render() {
    return (
      <div className="column is-one-quarter location-sidebar" key="locations">
        <div className="is-fullheight">
          <VoteableLocation votedFor={true}/>
          <VoteableLocation votedFor={true}/>
          <VoteableLocation/>
          <VoteableLocation/>
          <VoteableLocation/>
          <VoteableLocation/>
          <VoteableLocation/>
          <VoteableLocation/>
          <VoteableLocation/>
          <VoteableLocation/>
          <VoteableLocation/>
          <VoteableLocation/>
          <VoteableLocation votedFor={true}/>
          <VoteableLocation/>
          <VoteableLocation/>
          <VoteableLocation votedFor={true}/>
          <VoteableLocation/>
          <VoteableLocation/>
          <VoteableLocation/>
          <VoteableLocation/>
          <VoteableLocation votedFor={true}/>
          <VoteableLocation votedFor={true}/>
          <VoteableLocation/>
        </div>
      </div>
    );
  }
}