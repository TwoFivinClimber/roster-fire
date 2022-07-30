import axios from 'axios';
import { clientCredentials } from '../utils/client';

const fbUrl = clientCredentials.databaseURL;

const getTrades = () => new Promise((resolve, reject) => {
  axios.get(`${fbUrl}/trades.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch(reject);
});

const createTrade = (obj) => new Promise((resolve, reject) => {
  axios.post(`${fbUrl}/trades.json`, obj)
    .then((fbKeyObj) => {
      const update = { firebaseKey: fbKeyObj.data.name };
      axios.patch(`${fbUrl}/trades/${fbKeyObj.data.name}.json`, update)
        .then((response) => resolve(response.data));
    }).catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { getTrades, createTrade };
