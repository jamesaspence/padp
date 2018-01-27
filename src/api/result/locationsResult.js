export default class LocationsResult {
  constructor(response) {
    console.log(response);
    this._pageToken = response.next_page_token;
    this._locations = response.results;
  }

  get pageToken() {
    return this._pageToken;
  }

  get locations() {
    return this._locations;
  }
}