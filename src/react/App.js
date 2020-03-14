import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Header from './components/include/Header';
import Loader from './components/Loader';
import Home from './pages/Home';
import Login from './pages/Login';
import Voter from './pages/Voter';
import { getUser } from '../redux/selectors/user';
import { userRetrievedStatus } from '../redux/actions/user';

const mapStateToProps = state => getUser(state);

const mapDispatchToProps = dispatch => ({
  getUserRetrievedStatus: (status, user) => dispatch(userRetrievedStatus(status, user))
});

class App extends Component {
  constructor(props) {
    super(props);

    // this.onLogin = this.onLogin.bind(this);
    // this.renderRoutesAndRedirects = this.renderRoutesAndRedirects.bind(this);
    // this.renderLoader = this.renderLoader.bind(this);
    // this.initializeGAPI = this.initializeGAPI.bind(this);
  }

  componentDidMount() {
    // this.initializeGAPI();
  }

  initializeGAPI() {
    //We need this check because sometimes this var is not ready yet
    //We timeout and try again in 10 ms
    // if (typeof window.gapi === 'undefined') {
    //   setTimeout(this.initializeGAPI, 10);
    //   return;
    // }

    //TODO switch to API-based JWT auth (short lived tokens ONLY)
    // window.gapi.load('auth2', () => {
    //   window.gapi.auth2.init({
    //     client_id: process.env.REACT_APP_CLIENT_ID
    //   }).then(auth => {
    //     if (auth.isSignedIn.get()) {
    //       this.onLogin(auth.currentUser.get());
    //       return;
    //     }
    //
    this.props.getUserRetrievedStatus(true, null);
    //   });
    // });
  }

  onLogin(googleUser) {
    const user = {
      googleUser: googleUser,
      email: googleUser.getBasicProfile().getEmail(),
      id: googleUser.getId()
    };

    this.props.getUserRetrievedStatus(true, user);
  }

  renderRoutesAndRedirects() {
    const { user } = this.props;

    const renderLogin = routeProps => <Login {...routeProps} onLogin={this.onLogin} />;

    const components = [];
    const hasUser = user !== null;

    if (hasUser) {
      const renderHome = routeProps => <Home {...routeProps} user={user} />;
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

  renderLoader() {
    return (
      <div className="columns is-centered">
        <div className="column is-half">
          <Loader/>
        </div>
      </div>
    );
  }

  render() {
    const { retrieved } = this.props;

    return (
      <BrowserRouter>
        <div className="content-root">
          <Header/>
          <Login onLogin={this.onLogin} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);