import React from 'react';
import './LogoAwareWrap.scss';

const LogoAwareWrap = ({ children, className }) => (
  <div className={`logo-aware-wrap ${className}`}>
    {children}
  </div>
);

export default LogoAwareWrap;