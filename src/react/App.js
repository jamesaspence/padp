import React from 'react';
import './App.scss';
import Logo from './components/common/Logo';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/NewLogin';
import AuthBoundary from './boundaries/AuthBoundary';
import Home from './pages/NewHome';

const App = () => {
  return (
    <div className="app">
      <Logo/>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" render={() => (<AuthBoundary><Home /></AuthBoundary>)} />
        <Route path="*" render={() => <Redirect to="/home" />} />
      </Switch>
    </div>
  )
};

export default App;