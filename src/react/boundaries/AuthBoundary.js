import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { STATUSES } from '../../redux/actions/user';

const mapStateToProps = ({ user: { status, user } }) => ({
  status,
  user
});

const mapDispatchToProps = dispatch => ({
  redirectToLogin: () => dispatch(push('/login'))
});

const AuthBoundary = ({ status, user, children, redirectToLogin }) => {
  //if user is not null or loading is current status, allow through
  //Otherwise, redirect
  if (user != null || status === STATUSES.LOADING) {
    console.log('allowing through, user loaded or loading');
    return children;
  }

  console.log('redirecting to login!');
  redirectToLogin();
  return null;
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthBoundary);