import { FINISH_SELECTIONS } from '../actions/places';
import { FETCH_VOTE } from '../actions/voting';
import { STATUS_LOADING } from '../actions';

export const DEFAULT_STATE = {
  places: [],
  users: [],
  votes: [],
  //TODO move to react router redux when created
  sessionId: null,
  currentVote: {
    status: null,
    data: []
  }
};

const votingReducer = (state = DEFAULT_STATE, action) => {
  const { type } = action;

  switch (type) {
    case FINISH_SELECTIONS:
      return finishSelectionsReducer(state, action);
    case FETCH_VOTE:
      return fetchVoteReducer(state, action);
    default:
      return state;
  }
};

const fetchVoteReducer = (state, action) => {
  const { status } = action;

  switch (status) {
    case STATUS_LOADING:
      return {
        ...state,
        currentVote: {
          status,
          data: null
        }
      };
    default:
      return state;
  }
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

