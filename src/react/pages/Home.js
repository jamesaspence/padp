import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import LocationChoice from '../components/location/LocationChoice';
import Loader from '../components/Loader';
import Error from '../components/Error';

import { connect } from 'react-redux';
import { getNextPlace, getSelectedPlaces } from '../../redux/selectors/places';
import { finishSelections, getPlaces, incrementPlace, selectPlace } from '../../redux/actions/places';
import { STATUS_ERROR, STATUS_SUCCESS } from '../../redux/actions';
import { getSessionId } from '../../redux/selectors/voting';

const mapStateToProps = state =>  ({
  ...getNextPlace(state),
  ...getSelectedPlaces(state),
  ...getSessionId(state)
});

const mapDispatchToProps = dispatch => ({
  getPlaces: (lat, long) => dispatch(getPlaces(lat, long)),
  incrementPlace: () => dispatch(incrementPlace()),
  selectPlace: place => dispatch(selectPlace(place)),
  finishSelections: selections => dispatch(finishSelections(selections))
});

class Home extends Component {
  constructor(props) {
    super(props);

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

    this.props.incrementPlace();
    this.props.selectPlace(place);
  }

  nextLocation() {
    this.props.incrementPlace();
  }

  render() {
    const { place, status, selected, sessionId } = this.props;

    if (status === STATUS_SUCCESS) {
      if (sessionId != null) {
        return <Redirect to={`/vote${sessionId}`}/>
      }

      if (place == null || selected.length > 4) {
        //TODO handle if no selections are selected - game over then
        this.props.finishSelections(selected);
        return (
          <div className="columns is-centered">
            <div className="column is-half">
              <Loader/>
            </div>
          </div>
        );
      }

      return (
        <div className="columns is-centered">
          <div className="column is-half">
            <LocationChoice location={place} onNo={this.nextLocation} onYes={this.onYes}/>
          </div>
        </div>
      )
    }

    if (status === STATUS_ERROR) {
      return <Error errorMessage="Unable to retrieve locations right now."/>
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