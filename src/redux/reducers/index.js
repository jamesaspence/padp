import { combineReducers } from 'redux';
import userReducer, { DEFAULT_STATE as USER_DEFAULT_STATE } from './user';
import locationsReducer, { DEFAULT_STATE as LOCATIONS_DEFAULT_STATE } from './locations';

export const DEFAULT_STATE = {
  user: USER_DEFAULT_STATE,
  locations: LOCATIONS_DEFAULT_STATE
};

const appReducer = combineReducers({
  user: userReducer,
  locations: locationsReducer
});

export default (state = DEFAULT_STATE, action) => {
  return appReducer(state, action);
};