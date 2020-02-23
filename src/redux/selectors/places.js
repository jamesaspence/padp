import { STATUS_SUCCESS } from '../actions';

export const getSelectedPlaces = ({ places: { selected } }) => ({
  selected
});

export const getNextPlace = ({ places: { index, retrieval: { status, data } } }) => ({
  place: status === STATUS_SUCCESS && data.length > index ? data[index] : null,
  status
});