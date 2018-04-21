import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import React, {Component} from 'react';

/*
 * Include Components
 */
import Header from './include/Header';

/*
 * Route Components
 */
import Home from './Home';
import Login from './Login';
import Voter from './Voter';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      locationRequested: false,
      locationError: false,
      errorMessage: null,
      lat: null,
      long: null,
      user: null
    };

    this.onLogin = this.onLogin.bind(this);
    this.renderRoutesAndRedirects = this.renderRoutesAndRedirects.bind(this);
  }

  componentWillMount() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: process.env.REACT_APP_CLIENT_ID
      }).then(auth => {
        if (auth.isSignedIn.get()) {
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

    this.setState({
      user: user
    });
  }

  renderRoutesAndRedirects() {
    const renderLogin = routeProps => <Login {...routeProps} onLogin={this.onLogin} />;

    const components = [];
    const hasUser = this.state.user !== null;

    if (hasUser) {
      const renderHome = routeProps => <Home {...routeProps} lat={this.state.lat} long={this.state.long} user={this.state.user} />;
      components.push(<Route key="home" exact path="/home" render={renderHome}/>);
      components.push(<Route key="voter" path="/vote/:sessionId" component={Voter}/>);
      components.push(<Redirect key="rootRedirect" from="/" to={hasUser ? '/home' : '/login'}/>);
    } else {
      components.push(<Redirect key="loginRedirect" to="/login" />);
    }

    return (
      <Switch>
        <Route key="login" exact path="/login" render={renderLogin}/>
        {components}
      </Switch>
    );
  }

  render() {
    return (
      <BrowserRouter>
        <div className="content-root">
          <Header/>
          {this.renderRoutesAndRedirects()}
        </div>
      </BrowserRouter>
    );
  }
}