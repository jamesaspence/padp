import { FINISH_SELECTIONS } from '../actions/places';

export const DEFAULT_STATE = {
  places: [],
  users: [],
  votes: [],
  //TODO move to react router redux when created
  sessionId: null
};

const votingReducer = (state = DEFAULT_STATE, action) => {
  const { type } = action;

  if (type === FINISH_SELECTIONS) {
    return finishSelectionsReducer(state, action);
  }

  return {
    ...state
  };
};

const finishSelectionsReducer = (state, { selections, sessionId, user }) => ({
  ...state,
  selections,
  sessionId,
  users: [
    user.id
  ]
});

export default votingReducer;

