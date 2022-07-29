/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getPublicTeams } from '../api/teamData';
import TeamCard from '../components/TeamCard';
import { useAuth } from '../utils/context/authContext';

function PublicTeams() {
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();

  const getTheTeams = () => {
    getPublicTeams().then((teamsArr) => {
      setTeams(teamsArr.filter((team) => team.uid !== user.uid));
    });
  };

  useEffect(() => {
    getTheTeams();
  }, []);

  return (
    <div>
      <h1>Public Teams</h1>
      {teams.map((team) => (<TeamCard key={team.firebaseKey} obj={team} onUpdate={getTheTeams} />
      ))}
    </div>
  );
}

export default PublicTeams;
