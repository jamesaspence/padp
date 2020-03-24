import { AUTH_STATUS, STATUSES } from '../actions/user';
import { getAccessToken } from '../../service/localStorage';

export const DEFAULT_STATE = {
  status: null,
  user: null,
  token: null,
  error: null
};

export const getPreloadedState = () => {
  const token = getAccessToken();

  if (token == null) {
    return DEFAULT_STATE;
  }

  return {
    ...DEFAULT_STATE,
    token
  };
};

const userReducer = (state = DEFAULT_STATE, action) => {
  const { type } = action;

  if (type === AUTH_STATUS) {
    return authStatusReducer(state, action);
  }

  return state;
};

const authStatusReducer = (state, action) => {
  const { status } = action;

  switch (status) {
    case STATUSES.SUCCESS:
      return {
        ...state,
        status,
        error: null,
        user: action.user,
        token: action.token
      };
    case STATUSES.FAILURE:
      return {
        ...state,
        status,
        error: action.error,
        user: null,
        token: null
      };
    case STATUSES.LOADING:
      return {
        ...state,
        status
      };
    default:
      return state;
  }
};

export default userReducer;

