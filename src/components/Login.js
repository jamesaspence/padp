import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);

    this.state = {};
  }

  componentWillMount() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: process.env.REACT_APP_CLIENT_ID
      }).then(auth => {
        if (auth.isSignedIn.get()) {
          console.log('hooray');
          this.onLogin(auth.currentUser.get());
        }
      });
    });
  }

  onLogin(googleUser) {
    const user = {
      googleUser: googleUser,
      email: googleUser.getBasicProfile().getEmail(),
      id: googleUser.getId()
    };

    this.props.onLogin(user);
    this.setState({
      user: user
    });
  }

  render() {
    if (this.state.user) {
      {return <Redirect to="/home"/>}
    }

    return (
      <div className="columns is-centered">
        <div className="column is-half">
          <div id="my-signin2"></div>
        </div>
      </div>
    );
  }
}