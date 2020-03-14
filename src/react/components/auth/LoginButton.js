import React from 'react';
import './LoginButton.scss';

const LoginButton = ({ onClick, disabled }) => (
  <button className="button is-primary is-medium" onClick={onClick} disabled={disabled} type="button">Login</button>
);

export default LoginButton;