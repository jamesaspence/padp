import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      googleUser: null
    };
    this.onLogin = this.onLogin.bind(this);
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
    this.props.onLogin(googleUser);
    this.setState({
      googleUser: googleUser
    });
  }

  render() {

    if (this.state.googleUser !== null) {
      console.log('here?');
      return <Redirect to="/home"/>;
    }
    console.log('rendering');

    return (
      <div className="columns is-centered">
        <div className="column is-half">
          <div id="my-signin2"></div>
        </div>
      </div>
    );
  }
}