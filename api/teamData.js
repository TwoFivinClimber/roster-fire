import axios from 'axios';
import { clientCredentials } from '../utils/client';

const fbUrl = clientCredentials.databaseURL;

const getTeams = (uid) => new Promise((resolve, reject) => {
  axios.get(`${fbUrl}/teams.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getPublicTeams = () => new Promise((resolve, reject) => {
  axios.get(`${fbUrl}/teams.json?orderBy="isPublic"&equalTo=true`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getSingleTeam = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${fbUrl}/teams/${firebaseKey}.json`)
    .then((teamObj) => resolve(teamObj.data))
    .catch(reject);
});

const createTeam = (update) => new Promise((resolve, reject) => {
  axios.post(`${fbUrl}/teams.json`, update)
    .then((fbKeyObj) => {
      const fbKeyUpdate = { firebaseKey: fbKeyObj.data.name };
      axios.patch(`${fbUrl}/teams/${fbKeyObj.data.name}.json`, fbKeyUpdate)
        .then((teamObj) => resolve(teamObj.data));
    }).catch(reject);
});

const updateTeam = (teamData) => new Promise((resolve, reject) => {
  axios.patch(`${fbUrl}/teams/${teamData.firebaseKey}.json`, teamData)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteTeam = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${fbUrl}/teams/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

export {
  getTeams, getSingleTeam, createTeam, updateTeam, deleteTeam, getPublicTeams,
};
