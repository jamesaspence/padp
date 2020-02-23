import { combineReducers } from 'redux';
import userReducer, { DEFAULT_STATE as USER_DEFAULT_STATE } from './user';

export const DEFAULT_STATE = {
  user: USER_DEFAULT_STATE
};

const appReducer = combineReducers({
  user: userReducer
});

export default (state = DEFAULT_STATE, action) => {
  return appReducer(state, action);
};