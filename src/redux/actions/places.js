import apiService from '../../api/apiService';
import { STATUS_ERROR, STATUS_LOADING, STATUS_SUCCESS } from './index';

export const INCREMENT_PLACE = 'INCREMENT_PLACE';
export const SELECT_PLACE = 'SELECT_PLACE';
export const RETRIEVE_PLACES_STATUS = 'RETRIEVE_PLACES_STATUS';
export const FINISH_SELECTIONS = 'FINISH_SELECTIONS';

export const getPlaces = (lat, long, pageToken = null) => async dispatch => {
  //Set to loading only the first time results are loaded
  dispatch(retrievePlacesStatus(STATUS_LOADING));

  //TODO implement pageToken in different action
  try {
    const places = await apiService.getLocations(lat, long);
    dispatch(retrievePlacesStatus(STATUS_SUCCESS, places.locations));
  } catch (e) {
    dispatch(retrievePlacesStatus(STATUS_ERROR, e.response ? e.response.data : null));
  }
};

export const retrievePlacesStatus = (status, data = null) => ({
  type: RETRIEVE_PLACES_STATUS,
  status,
  data
});

export const incrementPlace = () => ({
  type: INCREMENT_PLACE
});

export const selectPlace = place => ({
  type: SELECT_PLACE,
  place
});

export const finishSelections = selections => async (dispatch, getState) => {
  const response = await apiService.createNewVote(selections);

  const { user: { user } } = getState();

  dispatch({
    type: FINISH_SELECTIONS,
    selections,
    sessionId: response.sessionId,
    user
  });
};