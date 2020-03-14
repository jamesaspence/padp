import React from 'react';
import './ContentWrap.scss';

const ContentWrap = ({ children, logoAware = false }) => (
  <div className={`content-wrap ${logoAware ? 'logo-aware' : ''}`}>
    {children}
  </div>
);

export default ContentWrap;