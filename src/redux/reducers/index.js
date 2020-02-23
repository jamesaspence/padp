import { combineReducers } from 'redux';
import userReducer, { DEFAULT_STATE as USER_DEFAULT_STATE } from './user';
import placesReducer, { DEFAULT_STATE as PLACES_DEFAULT_STATE } from './places';

export const DEFAULT_STATE = {
  user: USER_DEFAULT_STATE,
  places: PLACES_DEFAULT_STATE
};

const appReducer = combineReducers({
  user: userReducer,
  places: placesReducer
});

export default (state = DEFAULT_STATE, action) => {
  return appReducer(state, action);
};