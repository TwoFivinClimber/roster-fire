import React, { useState } from 'react';
import { useRouter } from 'next/router';
import getFullTeam from '../../api/mergedData';
import TeamCard from '../../components/TeamCard';
import PlayerCard from '../../components/PlayerCard';

function ViewTeam() {
  const [fullTeam, setFullTeam] = useState({});
  const { firebaseKey } = useRouter().query;

  const getTheTeam = () => {
    getFullTeam(firebaseKey).then(setFullTeam);
  };

  useState(() => {
    getTheTeam();
  }, []);

  return (
    <div>
      <TeamCard obj={fullTeam} />
      {fullTeam.players?.map((player) => (
        <PlayerCard key={player.firebaseKey} obj={player} onUpdate={getTheTeam} />
      ))}
    </div>
  );
}

export default ViewTeam;
