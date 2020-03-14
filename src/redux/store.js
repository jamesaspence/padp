import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import createRootReducer, { DEFAULT_STATE } from './reducers';
import { createBrowserHistory } from 'history';
import { STATUSES } from './actions/user';

export const history = createBrowserHistory();

export const registerAuthChangeSubscriber = store => {
  let currentStatus = null;

  //TODO ensure it updates w/ logout/login
  store.subscribe(() => {
    let previousStatus = currentStatus;
    const { status, token } = store.getState().user;
    currentStatus = status;

    if (currentStatus === STATUSES.SUCCESS && previousStatus !== currentStatus && token != null) {
      console.log(`storing token ${token} in localStorage.`);
      window.localStorage.setItem('accessToken', token);
    }
  });

};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => createStore(
  createRootReducer(history),
  DEFAULT_STATE,
  composeEnhancers(
    applyMiddleware(reduxThunk)
  )
);

export default configureStore;