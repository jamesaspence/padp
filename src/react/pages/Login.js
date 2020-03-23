import React, { Component } from 'react';
import './Login.scss';
import ContentContainer from '../components/common/ContentContainer';
import MainContent from '../components/common/MainContent';
import ContentWrap from '../components/common/ContentWrap';
import GoogleLogin from 'react-google-login';
import LoginButton from '../components/auth/LoginButton';
import { connect } from 'react-redux';
import apiService from '../../api/apiService';
import * as jwt from 'jsonwebtoken';
import { authFailure, authLoading, authSuccess } from '../../redux/actions/user';
import { push } from 'connected-react-router';
import { setAccessToken } from '../../service/localStorage';
import { Redirect } from 'react-router-dom';

const mapStateToProps = state => ({
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
  dispatchLoading: () => dispatch(authLoading()),
  dispatchSuccess: (token, user) => dispatch(authSuccess(token, user)),
  dispatchFailure: e => dispatch(authFailure(e)),
  redirectHome: () => dispatch(push('/home'))
});

class Login extends Component {

  constructor(props) {
    super(props);

    this.onGoogleSignInSuccess = this.onGoogleSignInSuccess.bind(this);
    this.onGoogleSignInFailure = this.onGoogleSignInFailure.bind(this);
  }

  async onGoogleSignInSuccess(response) {
    const email = response.getBasicProfile().getEmail();

    const { dispatchLoading, dispatchSuccess, dispatchFailure, redirectHome } = this.props;

    if (email == null) {
      //TODO handle failure
      return;
    }

    const idToken = response.getAuthResponse().id_token;

    dispatchLoading();

    let authResponse;
    try {
      authResponse = await apiService.authenticate(idToken);
    } catch (e) {
      console.error('e', e);
      dispatchFailure(e);
      return;
    }

    const accessToken = authResponse.data.token;
    setAccessToken(accessToken);
    dispatchSuccess(accessToken, jwt.decode(accessToken));
    redirectHome();
  }

  onGoogleSignInFailure() {
    console.log('sign in failure!');
  }

  render() {
    const { user } = this.props;

    console.log('user', user);
    if (user != null) {
      return <Redirect to="/home" />;
    }

    return (
      <div className="login-page">
        <ContentContainer>
          <MainContent>
            <ContentWrap>
              <div className="login-wrap">
                <div className="login-card">
                  <h2 className="subtitle">Find a place to eat with minimal bullshit.</h2>
                  <p className="content">Sign in to get started.</p>
                  <GoogleLogin
                    onSuccess={this.onGoogleSignInSuccess}
                    onFailure={this.onGoogleSignInFailure}
                    clientId={process.env.REACT_APP_CLIENT_ID}
                    render={({ onClick, disabled}) => <LoginButton onClick={onClick} disabled={disabled} loading={disabled} />}
                  />
                </div>
              </div>
            </ContentWrap>
          </MainContent>
        </ContentContainer>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);