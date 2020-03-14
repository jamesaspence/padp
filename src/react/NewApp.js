import React from 'react';
import './NewApp.scss';
import Logo from './components/common/Logo';
import ContentContainer from './components/common/ContentContainer';
import SidebarContent from './components/common/SidebarContent';
import MainContent from './components/common/MainContent';

const App = () => {
  return (
    <div className="app">
      <Logo/>
      <ContentContainer>
        <SidebarContent>
          <h1>Sidebar!</h1>
        </SidebarContent>
        <MainContent sidebarPresent={true}>
          <h2>Main Content!!</h2>
        </MainContent>
      </ContentContainer>
    </div>
  )
};

export default App;