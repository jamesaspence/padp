import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import LocationChoice from './location/LocationChoice';
import Loader from './Loader';
import Error from './Error';

import { connect } from 'react-redux';
import { getNextPlace, getSelectedPlaces } from '../redux/selectors/places';
import { getPlaces, incrementPlace, selectPlace } from '../redux/actions/places';
import { STATUS_ERROR, STATUS_SUCCESS } from '../redux/actions';

const mapStateToProps = state =>  ({
  ...getNextPlace(state),
  ...getSelectedPlaces(state)
});

const mapDispatchToProps = dispatch => ({
  getPlaces: (lat, long) => dispatch(getPlaces(lat, long)),
  incrementPlace: () => dispatch(incrementPlace()),
  selectPlace: place => dispatch(selectPlace(place))
});

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      selectedLocations: [],
      locationError: false,
      errorMessage: null,
      lat: null,
      long: null
    };
    this.onData = this.onData.bind(this);
    this.nextLocation = this.nextLocation.bind(this);
    this.onYes = this.onYes.bind(this);
    this.onLocation = this.onLocation.bind(this);
  }

  onData(results) {
    this.setState({
      isLoading: false,
      results: results,
      locationIndex: 0,
      selectedLocations: []
    });
  }

  componentDidMount() {
    const newState = {};

    if (!('geolocation' in window.navigator)) {
      newState.locationError = true;
      newState.errorMessage = 'Unable to retrieve location - no navigator available.';
      this.setState(newState);
      return;
    }

    this.onLocation();
    // window.navigator.geolocation.getCurrentPosition(position => {
    //   newState.lat = position.coords.latitude;
    //   newState.long = position.coords.longitude;
    //   this.setState(newState);
    //   this.onLocation();
    // }, e => {
    //   newState.locationError = true;
    //   newState.errorMessage = e.message;
    //   this.setState(newState);
    // });
  }

  onLocation() {

    //TODO switch back to dynamic
    const lat = 43.030129;
    const long = -87.911980;
    this.props.getPlaces(lat, long);
  }

  onYes() {
    const { place } = this.props;

    if (place == null) {
      //TODO error out - this should not happen here though.
      return;
    }
    // const selectedLocations = this.state.selectedLocations;
    // selectedLocations.push(this.state.results.locations[this.state.locationIndex]);
    // const newState = {
    //   selectedLocations: selectedLocations,
    //   locationIndex: this.state.locationIndex + 1
    // };
    //
    // if (newState.locationIndex > 19 || newState.selectedLocations.length > 4) {
    //   newState.isLoading = true;
    //   //TODO move to redux
    //   apiService.createNewVote(newState.selectedLocations)
    //     .then(result => {
    //       console.log('returned result!');
    //       console.log('redirecting hopefully');
    //       console.log(result);
    //       this.setState({sessionId: result.sessionId})
    //     });
    // }

    this.props.incrementPlace();
    this.props.selectPlace(place);
  }

  nextLocation() {
    this.props.incrementPlace();
    // this.setState({
    //   locationIndex: this.state.locationIndex + 1
    // });
  }

  render() {
    const { place, status } = this.props;

    if (status === STATUS_SUCCESS) {
      return (
        <div className="columns is-centered">
          <div className="column is-half">
            <LocationChoice location={place} onNo={this.nextLocation} onYes={this.onYes}/>
          </div>
        </div>
      )
    }

    //TODO check for null place earlier
    if (status === STATUS_ERROR) {
      return <Error errorMessage="Unable to retrieve locations right now."/>
    }

    if (this.state.sessionId) {
      console.log('session ID is set!');
      console.log('redirecting.');
      const sessionId = this.state.sessionId.startsWith('/') ? this.state.sessionId : `/${this.state.sessionId}`;
      return <Redirect to={`/vote${sessionId}`}/>;
    }

    return (
      <div className="columns is-centered">
        <div className="column is-half">
          <Loader/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);