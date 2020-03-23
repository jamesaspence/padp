import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import createRootReducer, { getPreloadedState } from './reducers';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => createStore(
  createRootReducer(history),
  getPreloadedState(),
  composeEnhancers(
    applyMiddleware(reduxThunk)
  )
);

export default configureStore;