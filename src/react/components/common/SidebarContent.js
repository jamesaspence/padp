import React from 'react';
import './SidebarContent.scss';

const SidebarContent = ({ children }) => (
  <div className="sidebar-content column">
    <div className="is-fullheight">
      {children}
    </div>
  </div>
);

export default SidebarContent;

