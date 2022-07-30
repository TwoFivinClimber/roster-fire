/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getSingleTeam } from '../api/teamData';
import { getTrades } from '../api/tradeData';
import TradeTeamCard from '../components/TradeTeamCard';
import { useAuth } from '../utils/context/authContext';

function Trades() {
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
  }, [user]);

  const acceptTrade = () => {
    console.warn('trade accepted');
  };

  const declineTrade = () => {
    console.warn('Trade Declined');
  };

  return (
    <div>
      <h1>Team Owner {trade.requestorDisplayName} Would like to Trade:</h1>
      <TradeTeamCard obj={requestorTeam} />
      <h1>For</h1>
      <TradeTeamCard obj={requestedTeam} />
      <div className="tradeBtn-div">
        <Button variant="success" onClick={acceptTrade}>Accept Trade</Button>
        <Button variant="danger" onClick={declineTrade}>Decline Trade</Button>
      </div>
    </div>
  );
}

export default Trades;
