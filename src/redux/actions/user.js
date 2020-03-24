import apiService from '../../api/apiService';
import * as jwt from 'jsonwebtoken';

export const AUTH_STATUS = 'AUTH_STATUS';
export const STATUSES = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
};

export const verifyAuth = token => async dispatch => {
  if (typeof token !== 'string' || token.trim().length < 1) {
    return dispatch(authFailure());
  }

  dispatch(authLoading());

  try {
    await apiService.verify(token);
  } catch (e) {
    dispatch(authFailure(e));
    return;
  }

  dispatch(authSuccess(token, jwt.decode(token)));
};

export const authFailure = (e = null) => ({
  type: AUTH_STATUS,
  status: STATUSES.FAILURE,
  error: e
});

export const authLoading = () => ({
  type: AUTH_STATUS,
  status: STATUSES.LOADING
});

export const authSuccess = (token, user) => ({
  type: AUTH_STATUS,
  status: STATUSES.SUCCESS,
  token,
  user
});