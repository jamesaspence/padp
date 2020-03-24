import React from 'react';
import './LoginButton.scss';

const LoginButton = ({ onClick, disabled, loading = false }) => (
  <button className={`button is-primary is-medium ${loading ? 'is-loading' : ''}`} onClick={onClick} disabled={disabled} type="button">Login</button>
);

export default LoginButton;