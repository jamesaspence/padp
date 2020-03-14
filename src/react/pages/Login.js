import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
import LoginButton from '../components/auth/LoginButton';
import apiService from '../../api/apiService';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onGoogleSignInSuccess = this.onGoogleSignInSuccess.bind(this);
    this.onGoogleSignInFailure = this.onGoogleSignInFailure.bind(this);
  }

  async onGoogleSignInSuccess(response) {
    const email = response.getBasicProfile().getEmail();

    if (email == null) {
      //TODO handle failure
      return;
    }

    const idToken = response.getAuthResponse().id_token;
    console.log('idToken', idToken);

    apiService.authenticate(idToken).then(res => console.log('res', res));
    //TODO authenticate w/ Google on server, generate JWT
    //TODO redirect once logged in
  }

  onGoogleSignInFailure() {
    //TODO handle properly
  }

  render() {
    return (
      <div className="columns is-centered">
        <div className="column is-half">
          <GoogleLogin
            onSuccess={this.onGoogleSignInSuccess}
            onFailure={this.onGoogleSignInFailure}
            clientId={process.env.REACT_APP_CLIENT_ID}
            render={({ onClick, disabled}) => <LoginButton onClick={onClick} disabled={disabled} />}
          />
        </div>
      </div>
    );
  }
}