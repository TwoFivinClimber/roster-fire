/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getSingleTeam, updateTeam } from '../api/teamData';
import { deleteTrade, getTrades } from '../api/tradeData';
import TradeTeamCard from '../components/TradeTeamCard';
import { useAuth } from '../utils/context/authContext';

function Trades() {
  const router = useRouter();
  const { user } = useAuth();
  const [trade, setTrade] = useState({});
  const [requestorTeam, setRequestorTeam] = useState({});
  const [requestedTeam, setRequestedTeam] = useState({});

  const getTheTrade = async () => {
    const tradesArray = await getTrades();
    const userTrade = tradesArray.filter((tradeTaco) => tradeTaco.requestedUid === user.uid || tradeTaco.requestorUid === user.uid);
    setTrade(userTrade[0]);
    getSingleTeam(userTrade[0].requestorTeamId).then(setRequestorTeam);
    getSingleTeam(userTrade[0].requestedTeamId).then(setRequestedTeam);
  };

  useEffect(() => {
    getTheTrade();
  }, []);

  const acceptTrade = () => {
    const teamRequest = {
      firebaseKey: requestedTeam.firebaseKey,
      uid: trade.requestorUid,
    };
    const teamReceive = {
      firebaseKey: requestorTeam.firebaseKey,
      uid: trade.requestedUid,
    };
    updateTeam(teamRequest).then(() => {
      updateTeam(teamReceive).then(() => {
        deleteTrade(trade);
      });
    });
    router.push('/teams');
  };

  const declineTrade = () => {
    if (window.confirm('Are you sure you want to decline ?')) {
      deleteTrade(trade);
    }
    router.push('/teams');
  };

  return (
    <div>
      <h1>Team Owner {trade.requestorDisplayName} Would like to Trade:</h1>
      <TradeTeamCard obj={requestorTeam} />
      <h1>For</h1>
      <TradeTeamCard obj={requestedTeam} />
      <div className="tradeBtn-div">
        <Button variant="success" className={trade.requestorUid === user.uid ? 'noShow' : ''} onClick={acceptTrade}>Accept Trade</Button>
        <Button variant="danger" onClick={declineTrade}>{trade.requestorUid === user.uid ? 'Delete Trade' : 'Decline Trade'}</Button>
      </div>
    </div>
  );
}

export default Trades;
