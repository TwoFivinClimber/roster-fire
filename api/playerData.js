import axios from 'axios';
import { clientCredentials } from '../utils/client';

const fbUrl = clientCredentials.databaseURL;

const getPlayers = (uid) => new Promise((resolve, reject) => {
  axios.get(`${fbUrl}/players.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getSinglePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${fbUrl}/players/${firebaseKey}.json`)
    .then((playerObj) => resolve(playerObj.data))
    .catch(reject);
});

const createPlayer = (update) => new Promise((resolve, reject) => {
  axios.post(`${fbUrl}/players.json`, update)
    .then((fbKeyObj) => {
      const fbKeyUpdate = { firebaseKey: fbKeyObj.data.name };
      axios.patch(`${fbUrl}/players/${fbKeyObj.data.name}.json`, fbKeyUpdate)
        .then((playerObj) => resolve(playerObj.data));
    }).catch(reject);
});

const updatePlayer = (playerData) => new Promise((resolve, reject) => {
  axios.patch(`${fbUrl}/players/${playerData.firebaseKey}.json`, playerData)
    .then((response) => resolve(response))
    .catch(reject);
});

const deletePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${fbUrl}/players/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

export {
  getPlayers, getSinglePlayer, createPlayer, updatePlayer, deletePlayer,
};
