import React, {Component} from 'react';

import VoteableLocation from './VoteableLocation';

import './LocationSidebar.scss';

export default class LocationSidebar extends Component {
  render() {
    let locations = this.props.locations.map((location, i) =>
      (<VoteableLocation key={location.data.id} number={i + 1} title={location.data.name}/>)
    );
    return (
      <div className="column is-one-quarter location-sidebar" key="locations">
        <div className="is-fullheight">
          {locations}
        </div>
      </div>
    );
  }
}