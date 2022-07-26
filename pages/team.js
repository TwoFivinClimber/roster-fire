/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getPlayers } from '../api/playerData';
import PlayerCard from '../components/PlayerCard';
import Search from '../components/Search';

function Team() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const { user } = useAuth();

  const getThePlayers = () => {
    getPlayers(user.uid).then((playersArr) => {
      setPlayers(playersArr);
      setFilteredPlayers(playersArr);
    });
  };

  useEffect(() => {
    getThePlayers();
  }, []);

  return (
    <div>
      <h1>Music City Markers</h1>
      <Search players={players} setFilteredPlayers={setFilteredPlayers} onUpdate={getThePlayers} />
      {filteredPlayers.map((player) => (
        <PlayerCard key={player.firebaseKey} obj={player} onUpdate={getThePlayers} />
      ))}
    </div>
  );
}

export default Team;
