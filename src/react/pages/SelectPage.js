import React from 'react';
// import './Select.scss';
import ContentContainer from '../components/common/ContentContainer';
import SidebarContent from '../components/common/SidebarContent';
import MainContent from '../components/common/MainContent';
import ContentWrap from '../components/common/ContentWrap';

const SelectPage = () => (
  <div className="SelectPage">
    <ContentContainer>
      <SidebarContent>
        <ContentWrap logoAware="true">
          <h1>SelectPage Sidebar!</h1>
        </ContentWrap>
      </SidebarContent>
      <MainContent>
        <ContentWrap>
          <h1>SelectPage Main Content!</h1>
        </ContentWrap>
      </MainContent>
    </ContentContainer>
  </div>
);

export default SelectPage;