import React from 'react';
import './Home.scss';
import ContentContainer from '../components/common/ContentContainer';
import MainContent from '../components/common/MainContent';
import ContentCard from '../components/common/ContentCard';
import ContentWrap from '../components/common/ContentWrap';
import BlockLink from '../components/common/BlockLink';

const Home = () => {
  return (
    <div className="home">
      <ContentContainer>
        <MainContent>
          <ContentWrap>
            <ContentCard>
              <h2 className="title is-2">
                Start a New Vote
              </h2>
              <p className="content">
                Want to go somewhere? Create a new vote and share the link, so you and your friends can vote!
              </p>
              <BlockLink to="/new">NEW VOTE</BlockLink>
              <h2 className="title is-2">Join a Vote</h2>
              <p className="content">
                Been invited to an outing? Enter the provided URL so we can get you set up.
              </p>
              <form className="VoteForm">
                <div className="field">
                  <label htmlFor="voteUrl" className="label">Vote URL</label>
                  <div className="control">
                    <input type="text" id="voteUrl" className="input"/>
                  </div>
                </div>
                <button className="button is-primary is-medium" type="button">Submit</button>
              </form>
            </ContentCard>
          </ContentWrap>
        </MainContent>
      </ContentContainer>
    </div>
  );
};

export default Home;