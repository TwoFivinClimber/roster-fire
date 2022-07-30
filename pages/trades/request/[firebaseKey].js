import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleTeam } from '../../../api/teamData';
import TradeForm from '../../../components/TradeForm';

function TradeRequest() {
  const [team, setTeam] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setTeam);
  }, [firebaseKey]);

  return (
    <>
      <TradeForm obj={team} />
    </>
  );
}

export default TradeRequest;
