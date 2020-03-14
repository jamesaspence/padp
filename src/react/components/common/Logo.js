import React from 'react';
import './Logo.scss';
import logo from '../../../logo.svg';
import { Link } from 'react-router-dom';

const Logo = () => (
  <div className="logo">
    <Link to="/">
      <img src={logo} alt="PADP Main Logo" className="logo-image"/>
    </Link>
  </div>
);

export default Logo;