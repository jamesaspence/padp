import React from 'react';
import './App.scss';
import Logo from './components/common/Logo';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/LoginPage';
import AuthBoundary from './boundaries/AuthBoundary';
import HomePage from './pages/HomePage';
import SelectPage from './pages/SelectPage';

const App = () => {
  return (
    <div className="app">
      <Logo/>
      <AuthBoundary>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/select" component={SelectPage} />
          <Route path="*" render={() => <Redirect to="/home" />} />
        </Switch>
      </AuthBoundary>
    </div>
  )
};

export default App;