import React, {Component} from 'react';
import GoogleMap from 'google-map-react';

export default class Map extends Component {
  render() {
    const Marker = ({name}) => <p>{name}</p>;
    // this.props.locations.forEach(location => console.log(location.data.geometry.location.lat, location.data.geometry.location.lng));
    let locationMarkers = this.props.locations.map(location => (
      <Marker
        lat={location.data.geometry.location.lat}
        lng={location.data.geometry.location.lng}
        key={location.data.id}
        name={location.data.name}
        />
    ));

    return (
      <div className="column is-three-quarters" key="map">
        <GoogleMap
          bootstrapURLKeys={{key: process.env.REACT_APP_MAPS_TOKEN}}
          defaultCenter={this.props.center}
          defaultZoom={12}
        >
          {locationMarkers}
        </GoogleMap>
      </div>
    );
  }
}