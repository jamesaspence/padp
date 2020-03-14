import { USER_RETRIEVED } from '../actions/user';

export const DEFAULT_STATE = {
  retrieved: false,
  user: null
};

const userReducer = (state = DEFAULT_STATE, action) => {
  const { type } = action;

  switch (type) {
    case USER_RETRIEVED:
      return userRetrievedReducer(state, action);
    default: {
      return {
        ...state
      };
    }
  }
};

const userRetrievedReducer = (state, { status, user }) => ({
  ...state,
  retrieved: status,
  user
});

export default userReducer;

