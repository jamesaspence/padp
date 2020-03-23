import React from 'react';
import ContentContainer from '../components/common/ContentContainer';
import SidebarContent from '../components/common/SidebarContent';
import MainContent from '../components/common/MainContent';

const Home = () => {
  return (
    <div className="home">
      <ContentContainer>
        <SidebarContent>
          <h2>Sidebar!</h2>
        </SidebarContent>
        <MainContent>
          <h1>Home Page!</h1>
        </MainContent>
      </ContentContainer>
    </div>
  );
};

export default Home;