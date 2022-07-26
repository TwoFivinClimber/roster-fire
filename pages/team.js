import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getPlayers } from '../api/playerData';
import PlayerCard from '../components/PlayerCard';

function Team() {
  const [players, setPlayers] = useState([]);
  const { user } = useAuth();

  const getThePlayers = () => {
    getPlayers(user.uid).then(setPlayers);
  };

  useEffect(() => {
    getThePlayers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players]);

  return (
    <div>
      <h1>Music City Markers</h1>
      {players.map((player) => (
        <PlayerCard key={player.firebaseKey} obj={player} onUpdate={getThePlayers} />
      ))}
    </div>
  );
}

export default Team;
