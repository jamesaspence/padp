import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Header from './components/include/Header';
import Loader from './components/Loader';
import Home from './pages/Home';
import Login from './pages/Login';
import Voter from './pages/Voter';
import { verifyAuth, authFailure } from '../redux/actions/user';
import AuthBoundary from './boundaries/AuthBoundary';

const mapStateToProps = ({ user: { user, status } }) => ({
  user,
  status
});

const mapDispatchToProps = dispatch => ({
  verifyAuth: token => dispatch(verifyAuth(token)),
  missingToken: () => dispatch(authFailure())
});

class App extends Component {
  constructor(props) {
    super(props);

    this.renderLoader = this.renderLoader.bind(this);
    this.renderRoutes = this.renderRoutes.bind(this);
  }

  componentDidMount() {
    const { verifyAuth, missingToken } = this.props;

    const token = window.localStorage.getItem('accessToken');
    if (token == null) {
      console.log('no token, redirecting');
      missingToken();
      return;
    }

    verifyAuth(token);
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

  renderRoutes() {
    const { user } = this.props;
    const renderHome = routeProps => <Home {...routeProps} user={user} />;

    return (
      <AuthBoundary>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" render={renderHome}/>
          <Route path="/vote/:sessionId" component={Voter}/>
          <Route path="*" render={() => {
            console.log('catchall firing?');
            return <Redirect to="/home" />
          }} />
        </Switch>
      </AuthBoundary>
    );
  }

  render() {
    const { user, status } = this.props;
    console.log('status', status);

    return (
      <BrowserRouter>
          <div className="content-root">
            <Header/>
            { user == null && status == null ? this.renderLoader() : null}
            <Login />
          </div>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);