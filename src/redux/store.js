import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import createRootReducer, { DEFAULT_STATE } from './reducers';
import { createBrowserHistory } from 'history';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

const configureStore = () => createStore(
  createRootReducer(history),
  DEFAULT_STATE,
  composeEnhancers(
    applyMiddleware(reduxThunk)
  )
);

export default configureStore;