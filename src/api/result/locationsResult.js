export default class LocationsResult {
  constructor(json) {
    this._pageToken = json.next_page_token;
    this._locations = JSON.parse(json.results);
  }

  get pageToken() {
    return this._pageToken;
  }

  get locations() {
    return this._locations;
  }
}