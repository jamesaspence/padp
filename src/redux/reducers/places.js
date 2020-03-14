import { INCREMENT_PLACE, RETRIEVE_PLACES_STATUS, SELECT_PLACE } from '../actions/places';

export const DEFAULT_STATE = {
  retrieval: {
    status: null,
    data: null
  },
  pageTokens: [],
  selected: [],
  index: 0
};

const placesReducer = (state = DEFAULT_STATE, action) => {
  const { type } = action;

  switch (type) {
    case RETRIEVE_PLACES_STATUS:
      return retrievePlacesStatusReducer(state, action);
    case INCREMENT_PLACE:
      return incrementPlaceReducer(state);
    case SELECT_PLACE:
      return selectPlaceReducer(state, action);
    default:
      return {
        ...state
      };
  }
};

const retrievePlacesStatusReducer = (state, action) => {
  const { retrieval, ...rest } = state;
  const { status, data } = action;

  return {
    ...rest,
    retrieval: {
      status,
      data
    }
  }
};

const incrementPlaceReducer = ({ index, ...rest }) => ({
  ...rest,
  index: ++index
});

const selectPlaceReducer = ({ selected, ...rest }, { place }) => {
  if (!selected.includes(place)) {
    selected.push(place);
  }

  return {
    ...rest,
    selected
  };
};

export default placesReducer;