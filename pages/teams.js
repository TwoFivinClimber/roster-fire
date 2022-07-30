/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getTeams } from '../api/teamData';
import TeamCard from '../components/TeamCard';
import { useAuth } from '../utils/context/authContext';

function Teams() {
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();

  const getTheTeams = () => {
    getTeams(user.uid).then(setTeams);
  };

  useEffect(() => {
    getTheTeams();
  }, [teams]);

  return (
    <div>
      <h1>Teams</h1>
      {teams.map((team) => (<TeamCard key={team.firebaseKey} obj={team} onUpdate={getTheTeams} />
      ))}
    </div>
  );
}

export default Teams;
