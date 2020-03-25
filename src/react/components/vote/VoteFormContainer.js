import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VoteForm from './VoteForm';
import { STATUS_LOADING } from '../../../redux/actions';
import { fetchVoteLoading } from '../../../redux/actions/voting';

const onUrlSubmit = (voteUrl, dispatch) => {
  dispatch(fetchVoteLoading());
  console.log('voteUrl', voteUrl);
};

const VoteFormContainer = () => {
  const [validationError, setValidationError] = useState(null);

  const selectCurrentVoteStatus = state => state.voting.currentVote.status;
  const dispatch = useDispatch();

  const onSubmit = event => {
    event.preventDefault();
    setValidationError(null);

    const voteUrl = event.target.querySelector('#voteUrl').value;

    if (typeof voteUrl !== 'string' || voteUrl.length < 1) {
      setValidationError('Please enter a valid URL.');
      return;
    }
    onUrlSubmit(voteUrl, dispatch);
  };

  const status = useSelector(selectCurrentVoteStatus);
  const isLoading = status === STATUS_LOADING;

  return (
    <VoteForm disabled={isLoading} validationError={validationError} loading={isLoading} onSubmit={onSubmit} />
  )
};

export default VoteFormContainer;