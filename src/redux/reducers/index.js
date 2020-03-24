import { combineReducers } from 'redux';
import userReducer, { DEFAULT_STATE as USER_DEFAULT_STATE, getPreloadedState as getUserState } from './user';
import placesReducer, { DEFAULT_STATE as PLACES_DEFAULT_STATE } from './places';
import votingReducer, { DEFAULT_STATE as VOTING_DEFAULT_STATE } from './voting';
import { connectRouter } from 'connected-react-router';

export const DEFAULT_STATE = {
  user: USER_DEFAULT_STATE,
  places: PLACES_DEFAULT_STATE,
  voting: VOTING_DEFAULT_STATE
};

export const getPreloadedState = () => ({
  ...DEFAULT_STATE,
  user: getUserState()
});

const createRootReducer = history => combineReducers({
  user: userReducer,
  places: placesReducer,
  voting: votingReducer,
  router: connectRouter(history)
});

export default createRootReducer;