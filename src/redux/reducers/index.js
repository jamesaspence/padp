import { combineReducers } from 'redux';
import userReducer, { DEFAULT_STATE as USER_DEFAULT_STATE } from './user';
import placesReducer, { DEFAULT_STATE as PLACES_DEFAULT_STATE } from './places';
import votingReducer, { DEFAULT_STATE as VOTING_DEFAULT_STATE } from './voting';

export const DEFAULT_STATE = {
  user: USER_DEFAULT_STATE,
  places: PLACES_DEFAULT_STATE,
  voting: VOTING_DEFAULT_STATE
};

const appReducer = combineReducers({
  user: userReducer,
  places: placesReducer,
  voting: votingReducer
});

export default (state = DEFAULT_STATE, action) => {
  return appReducer(state, action);
};