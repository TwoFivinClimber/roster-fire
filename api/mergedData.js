import { getTeamPlayers } from './playerData';
import { getSingleTeam } from './teamData';

const getFullTeam = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleTeam(firebaseKey).then((teamObj) => {
    getTeamPlayers(firebaseKey).then((playersArr) => {
      resolve({ ...teamObj, players: playersArr });
    });
  }).catch(reject);
});

export default getFullTeam;
