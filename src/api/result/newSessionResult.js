import Result from './';

export default class NewSessionResult extends Result {
  constructor(response) {
    super(response);
    this._sessionId = response.sessionId;
  }

  get sessionId() {
    return this._sessionId;
  }
}