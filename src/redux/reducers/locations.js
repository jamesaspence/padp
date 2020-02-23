import { USER_LOCATION_RETRIEVED, PLACES_RETRIEVED, INCREMENT_PLACE, SELECT_PLACE } from '../actions/locations';

export const DEFAULT_STATE = {
  places: [],
  placeIndex: 0,
  selected: [],
  pageTokens: [],
  userLocation: {
    error: null,
    lat: null,
    long: null
  }
};

const locationsReducer = (state = DEFAULT_STATE, action) => {
  const { type } = action;

  switch (type) {
    case USER_LOCATION_RETRIEVED:
      return userLocationRetrievedReducer(state, action);
    case PLACES_RETRIEVED:
      return placesRetrievedReducer(state, action);
    case INCREMENT_PLACE:
      return incrementPlaceReducer(state);
    case SELECT_PLACE:
      return selectPlaceReducer(state, action);
  }

  return {
    ...state
  };
};

const userLocationRetrievedReducer = (state, { error, lat, long }) => ({
  ...state,
  userLocation: {
    error,
    lat,
    long
  }
});

const placesRetrievedReducer = (state, { places, pageToken }) => {
  const { pageTokens, places: existingPlaces } = state;

  if (!pageTokens.includes(pageToken)) {
    pageTokens.push(pageToken);

    return {
      ...state,
      pageTokens,
      places: existingPlaces.concat(places)
    };
  }

  return {
    ...state
  };
};

const incrementPlaceReducer = ({ placeIndex, ...rest }) => ({
  ...rest,
  placeIndex: ++placeIndex
});

const selectPlaceReducer = ({ selected, ...rest }, { place }) => {
  if (!selected.includes(place)) {
    selected.push(place);
  }

  return {
    ...rest,
    selected
  };
};

export default locationsReducer;