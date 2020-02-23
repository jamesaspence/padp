import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer, { DEFAULT_STATE } from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  DEFAULT_STATE,
  composeEnhancers(
    applyMiddleware(reduxThunk)
  )
);