import axios from 'axios';
import { clientCredentials } from '../utils/client';

const fbUrl = clientCredentials.databaseURL;

const getPlayers = (uid) => new Promise((resolve, reject) => {
  axios.get(`${fbUrl}/players.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

export default getPlayers;
