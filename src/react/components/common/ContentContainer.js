import React from 'react';
import './ContentContainer.scss';

const ContentContainer = ({ children }) => (
  <div className="content-container columns">
    {children}
  </div>
);

export default ContentContainer;