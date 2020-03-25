import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VoteForm from './VoteForm';
import { STATUS_LOADING } from '../../../redux/actions';
import { fetchVoteLoading } from '../../../redux/actions/voting';

const onUrlSubmit = (voteUrl, dispatch) => {
  dispatch(fetchVoteLoading());
  console.log('voteUrl', voteUrl);
};

const VoteFormContainer = () => {
  const selectCurrentVoteStatus = state => state.voting.currentVote.status;
  const dispatch = useDispatch();

  const onSubmit = event => {
    event.preventDefault();
    const voteUrl = event.target.querySelector('#voteUrl').value;
    onUrlSubmit(voteUrl, dispatch);
  };

  const status = useSelector(selectCurrentVoteStatus);
  const isLoading = status === STATUS_LOADING;

  return (
    <VoteForm disabled={isLoading} loading={isLoading} onSubmit={onSubmit} />
  )
};

export default VoteFormContainer;