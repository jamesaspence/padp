import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
import LoginButton from '../components/auth/LoginButton';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { authenticate, STATUSES } from '../../redux/actions/user';

const mapStateToProps = ({ user: { status, user } }) => ({
  status, user
});

const mapDispatchToProps = dispatch => ({
  redirectHome: () => dispatch(push('/home')),
  triggerAuthentication: idToken => dispatch(authenticate(idToken))
});

class Login extends Component {
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

    this.props.triggerAuthentication(idToken);
  }

  onGoogleSignInFailure() {
    //TODO handle properly
  }

  render() {
    const { user, status, redirectHome } = this.props;

    if (user != null && status === STATUSES.SUCCESS) {
      console.log('Redirecting to home!');
      redirectHome();
      return null;
    }

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

export default connect(mapStateToProps, mapDispatchToProps)(Login);