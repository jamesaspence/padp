export default class Result {
  constructor(response) {
    this._rawResponse = response;
  }

  get rawResponse() {
    return this._rawResponse;
  }
};