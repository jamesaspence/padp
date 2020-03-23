import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { STATUSES } from '../../redux/actions/user';

const AuthBoundary = ({ children }) => {
  const selectUserStatus = state => state.user.status;
  const selectUser = state => state.user.user;

  const status = useSelector(selectUserStatus);
  const user = useSelector(selectUser);

  console.log('authBoundaryUser', user);
  console.log('status', status);
  //if user is not null or loading is current status, allow through
  //Otherwise, redirect
  if (user != null || status === STATUSES.LOADING) {
    console.log('passing through???');
    return (
      <>
        {children}
      </>
    );
  }

  console.log('redirecting!!');
  return <Redirect to="/login" />;
};

export default AuthBoundary;