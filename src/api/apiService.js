import axios from 'axios';
import LocationsResult from './result/locationsResult';
import NewSessionResult from './result/newSessionResult';
import LocationDataResult from './result/locationDataResult';

//43.030129
//-87.911980

class APIService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  getLocations(lat, lng) {
    const url = `${this.apiUrl}/locations`;
    const config = {
      params: {
        lat: lat,
        lng: lng
      }
    };

    return axios.get(url, config)
      .then(res => new LocationsResult(res.data));
  }

  createNewVote(selectedLocations) {
    const url = `${this.apiUrl}/session`;
    const body = {
      selectedLocations: selectedLocations
    };
    const headers = {
      'Content-Type': 'application/json'
    };

    return axios.post(url, body, headers)
      .then(res => new NewSessionResult(res.data));
  }

  getVoterData(key) {
    const url = `${this.apiUrl}/data/${key}`;
    return axios.get(url)
      .then(res => new LocationDataResult(res.data));
  }

  authenticate(idToken) {
    const url = `${this.apiUrl}/oauth`;

    console.log('making request (apiService)');
    return axios.post(url, {}, {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    });
  }

  verify(token) {
    const url = `${this.apiUrl}/oauth/verify`;

    return axios.post(url, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

//TODO pull env vars
export default new APIService('http://localhost:5000');