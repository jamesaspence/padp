import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Logo from './components/common/Logo';
import Loader from './components/Loader';
import Home from './pages/Home';
import Login from './pages/Login';
import Voter from './pages/Voter';
import { verifyAuth, authFailure } from '../redux/actions/user';

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
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" render={renderHome}/>
        <Route exact path="/vote/:sessionId" component={Voter}/>
        <Route path="*" render={() => <Redirect to="/home" />} />
      </Switch>
    );
  }

  render() {
    const { user, status } = this.props;

    return (
      <BrowserRouter>
          <div className="content-root">
            <Logo/>
            { user == null && status == null ? this.renderLoader() : this.renderRoutes() }
          </div>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);