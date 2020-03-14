import React from 'react';
import './App.scss';
import Logo from './components/common/Logo';
import { Route, Redirect } from 'react-router-dom';
import Login from './pages/NewLogin';

const App = () => {
  return (
    <div className="app">
      <Logo/>
      <Route exact path="/login" component={Login} />
      <Route path="*" render={() => <Redirect to="/login" />} />
    </div>
  )
};

export default App;