import { getTeamPlayers, updatePlayer } from './playerData';
import { deleteTeam, getSingleTeam, updateTeam } from './teamData';

const getFullTeam = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleTeam(firebaseKey).then((teamObj) => {
    getTeamPlayers(firebaseKey).then((playersArr) => {
      resolve({ ...teamObj, players: playersArr });
    });
  }).catch(reject);
});

const dissolveTeam = (teamFbKey) => new Promise((resolve, reject) => {
  getTeamPlayers(teamFbKey).then((playersArr) => {
    const update = { team: '', teamId: '' };
    const updateTeamPlayers = playersArr.map((player) => updatePlayer({ ...player, ...update }));
    Promise.all(updateTeamPlayers).then(() => {
      resolve(deleteTeam(teamFbKey));
    });
  }).catch(reject);
});

const updateTeamAndPlayers = (teamObj) => new Promise((resolve, reject) => {
  getTeamPlayers(teamObj.firebaseKey).then((playersArr) => {
    const update = { team: teamObj.name };
    const updatePlayers = playersArr.map((player) => updatePlayer({ ...player, ...update }));
    Promise.all(updatePlayers).then(() => {
      resolve(updateTeam(teamObj));
    });
  }).catch(reject);
});

export { getFullTeam, dissolveTeam, updateTeamAndPlayers };
