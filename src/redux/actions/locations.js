import apiService from '../../api/apiService';

export const USER_LOCATION_RETRIEVED = 'USER_LOCATION_RETRIEVED';
export const PLACES_RETRIEVED = 'PLACES_RETRIEVED';
export const INCREMENT_PLACE = 'INCREMENT_PLACE';
export const SELECT_PLACE = 'SELECT_PLACE';

export const locationRetrieved = (lat, long, error) => ({
  lat,
  long,
  error
});

export const placesRetrieved = (places, pageToken) => ({
  type: PLACES_RETRIEVED,
  places,
  pageToken
});

export const getPlaces = (lat, long, pageToken = null) => async dispatch => {
  //TODO implement pageToken
  //TODO add error handling
  const places = await apiService.getLocations(lat, long);

  dispatch(placesRetrieved(places.locations, places.pageToken));
};

export const incrementPlace = () => ({
  type: INCREMENT_PLACE
});

export const selectPlace = place => ({
  type: SELECT_PLACE,
  place
});