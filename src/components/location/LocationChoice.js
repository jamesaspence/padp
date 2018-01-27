import React, {Component} from 'react';

export default class LocationChoice extends Component {
  render() {
    const location = this.props.location;
    return (
      <div className="card">
        <div className="card-content">
          <h3 className="title">{location.name}</h3>
          <div className="address-content">
            <p className="address-one">{location.vicinity}</p>
          </div>
        </div>
        <div className="card-footer">
          <a className="card-footer-item">Nah</a>
          <a className="card-footer-item">Sure</a>
        </div>
      </div>
    );
  }
}