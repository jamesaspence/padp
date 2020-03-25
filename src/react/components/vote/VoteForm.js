import React from 'react';
import './VoteForm.scss';

const VoteForm = ({ onSubmit, validationError = null, disabled = false, loading = false }) => (
  <form className="VoteForm" onSubmit={onSubmit}>
    <div className="field">
      <label htmlFor="voteUrl" className="label">Vote URL</label>
      <div className="control">
        <input type="text" disabled={disabled} id="voteUrl" className={`input ${validationError != null ? 'is-danger' : ''}`}/>
      </div>
      { validationError != null &&
        <p className="help is-danger">{validationError}</p>
      }
    </div>
    <button className={`button is-primary is-medium ${loading ? 'is-loading' : ''}`} disabled={disabled}>Submit</button>
  </form>
);

export default VoteForm;