import React from 'react';
import './NewLogin.scss';
import ContentContainer from '../components/common/ContentContainer';
import MainContent from '../components/common/MainContent';
import ContentWrap from '../components/common/ContentWrap';

const Login = () => (
  <div className="login-page">
    <ContentContainer>
      <MainContent>
        <ContentWrap>
          <div className="section login-image-bg">
            <div className="container">
              <div className="level">
                <div className="level-item">
                  <div className="login-card">
                    <h2 className="subtitle">Find a place to eat with minimal bullshit.</h2>
                    <p className="content">Sign in to get started.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContentWrap>
      </MainContent>
    </ContentContainer>
  </div>
);

export default Login;