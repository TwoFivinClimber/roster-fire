import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { getFullTeam } from '../../api/mergedData';
import TradeTeamCard from '../../components/TradeTeamCard';
import TradePlayerCard from '../../components/TradePlayerCard';

function ViewTradeTeam() {
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
      <TradeTeamCard obj={fullTeam} />
      {fullTeam.players?.map((player) => (
        <TradePlayerCard key={player.firebaseKey} obj={player} onUpdate={getTheTeam} />
      ))}
    </div>
  );
}

export default ViewTradeTeam;
