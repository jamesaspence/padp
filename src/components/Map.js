import React, {Component} from 'react';
import GoogleMap from 'google-map-react';
import {fitBounds} from 'google-map-react/utils';

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.getWidthAndHeight = this.getWidthAndHeight.bind(this);
  }

  getWidthAndHeight(element) {
    const width = element.offsetWidth;
    const height = element.offsetHeight;

    const bounds = this.props.bounds;

    const {center, zoom} = fitBounds(bounds, {
      width: width,
      height: height
    });

    this.setState({
      center: center,
      zoom: zoom
    });
  }

  render() {
    const Marker = ({name}) => <p>{name}</p>;

    // this.props.locations.forEach(location => console.log(location.data.geometry.location.lat, location.data.geometry.location.lng));
    let locationMarkers = this.props.locations.map(location => {
      const lat = location.data.geometry.location.lat;
      const lng = location.data.geometry.location.lng;

      return (
        <Marker
          lat={lat}
          lng={lng}
          key={location.data.id}
          name={location.data.name}
        />
      );
    });

    const props = {};

    const state = this.state;
    if (state.hasOwnProperty('center') && state.hasOwnProperty('zoom')) {
      props.center = state.center;
      props.zoom = state.zoom;
    }

    return (
      <div className="column is-three-quarters" key="map" ref={this.getWidthAndHeight}>
        <GoogleMap
          {...props}
          defaultCenter={{lat: 0, lng: 0}}
          defaultZoom={12}
          bootstrapURLKeys={{
            key: process.env.REACT_APP_MAPS_TOKEN
          }}
        >
          {locationMarkers}
        </GoogleMap>
      </div>
    );
  }
}
