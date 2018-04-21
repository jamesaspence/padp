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
      long: null
    };

    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(response) {
    console.log(response);
  }

  render() {
    const renderHome = routeProps => <Home {...routeProps} lat={this.state.lat} long={this.state.long} />;
    const renderLogin = routeProps => <Login onLogin={this.onLogin} />;
    return (
      <BrowserRouter>
        <div className="content-root">
          <Header/>
          <Switch>
            <Route key="0" exact path="/home" render={renderHome}/>
            <Route key="1" exact path="/login" render={renderLogin}/>
            <Route key="2" path="/vote/:sessionId" component={Voter}/>
            <Redirect from="/" to="/login"/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}