import React from 'react';
import './MainContent.scss';

const MainContent = ({ children }) => (
  <div className="main-content column">
    {children}
  </div>
);

export default MainContent;