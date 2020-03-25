import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authFailure, authLoading, authSuccess, STATUSES } from '../../redux/actions/user';
import apiService from '../../api/apiService';
import * as jwt from 'jsonwebtoken';
import Loader from '../components/Loader';
import { clearAccessToken } from '../../service/localStorage';

const mapStateToProps = state => ({
  user: state.user.user,
  status: state.user.status,
  token: state.user.token,
  pathname: state.router.location.pathname
});

const mapDispatchToProps = dispatch => ({
  dispatchFailure: (e = null) => dispatch(authFailure(e)),
  dispatchLoading: () => dispatch(authLoading()),
  dispatchSuccess: (token, user) => dispatch(authSuccess(token, user))
});

class AuthBoundary extends Component {
  componentDidMount() {
    const { token, status, dispatchFailure, dispatchLoading, dispatchSuccess } = this.props;

    if (typeof token !== 'string' || token.trim().length < 1) {
      dispatchFailure();
      return;
    }

    if (status != null) {
      return;
    }

    dispatchLoading();

    apiService.verify(token)
      .then(() => jwt.decode(token))
      .then(user => dispatchSuccess(token, user))
      .catch(e => {
        clearAccessToken();
        dispatchFailure(e)
      });
  }

  render() {
    const { user, status, children, pathname } = this.props;

    if (user == null) {
      if (status == null || status === STATUSES.LOADING) {
        return <Loader />;
      } else if (pathname !== '/login') {
        return (
          <Redirect to="/login" />
        );
      }
    }

    return <>{children}</>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthBoundary);