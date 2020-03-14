import React from 'react';
import './LogoAwareWrap.scss';

const LogoAwareWrap = ({ children }) => (
  <div className="logo-aware-wrap">
    {children}
  </div>
);

export default LogoAwareWrap;