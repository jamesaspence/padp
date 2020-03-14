import React from 'react';
import './SidebarContent.scss';
import ContentWrap from './ContentWrap';

const SidebarContent = ({ children }) => (
  <div className="sidebar-content column is-one-quarter">
    <ContentWrap logoAware={true}>
      {children}
    </ContentWrap>
  </div>
);

export default SidebarContent;

