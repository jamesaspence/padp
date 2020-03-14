import React from 'react';
import './SidebarContent.scss';
import LogoAwareWrap from './LogoAwareWrap';

const SidebarContent = ({ children }) => (
  <div className="sidebar-content column is-one-quarter">
    <LogoAwareWrap className="is-fullheight">
      {children}
    </LogoAwareWrap>
  </div>
);

export default SidebarContent;

