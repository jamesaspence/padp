import axios from 'axios';
import LocationsResult from './result/locationsResult';

//43.030129
//-87.911980

class APIService {
  constructor(apiUrl, apiKey) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
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
      .then(res => new LocationsResult(res));
  }
}

export default new APIService();