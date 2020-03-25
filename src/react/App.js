import React from 'react';
import './App.scss';
import Logo from './components/common/Logo';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login';
import AuthBoundary from './boundaries/AuthBoundary';
import Home from './pages/Home';

const App = () => {
  return (
    <div className="app">
      <Logo/>
      <AuthBoundary>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route path="*" render={() => <Redirect to="/home" />} />
        </Switch>
      </AuthBoundary>
    </div>
  )
};

export default App;