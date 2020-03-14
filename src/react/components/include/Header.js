import React, {Component} from 'react';
import logo from '../../../logo.svg';

export default class Header extends Component {
  render() {
    return (
      <a href="/">
        <img id="logo" src={logo} alt="padp logo"/>
      </a>
    );
  }
}