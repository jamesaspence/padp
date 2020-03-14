import React from 'react';
import './MainContent.scss';

const MainContent = ({ children, sidebarPresent = false }) => (
  <div className={`main-content column ${sidebarPresent ? 'is-three-quarters' : ''}`}>
    {children}
  </div>
);

export default MainContent;