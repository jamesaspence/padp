import axios from 'axios';
import LocationsResult from './result/locationsResult';

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
}

//TODO pull env vars
export default new APIService('http://localhost:5000');