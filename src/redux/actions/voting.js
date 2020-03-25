import { STATUS_ERROR, STATUS_LOADING, STATUS_SUCCESS } from './index';

export const FETCH_VOTE = 'FETCH_VOTE';

export const fetchVoteLoading = () => ({
  type: FETCH_VOTE,
  status: STATUS_LOADING
});

export const fetchVoteSuccess = data => ({
  type: FETCH_VOTE,
  status: STATUS_SUCCESS,
  data
});

export const fetchVoteFailure = () => ({
  type: FETCH_VOTE,
  status: STATUS_ERROR
});