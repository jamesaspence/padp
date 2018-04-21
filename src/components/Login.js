import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);

    this.state = {};
  }

  componentDidMount() {
    window.gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 200,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onLogin
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
      return <Redirect to="/home"/>
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