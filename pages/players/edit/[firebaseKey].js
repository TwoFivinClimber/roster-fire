import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSinglePlayer } from '../../../api/playerData';
import PlayerForm from '../../../components/PlayerForm';

function EditPlayer() {
  const [player, setPlayer] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePlayer(firebaseKey).then(setPlayer);
  }, [firebaseKey]);

  return (<PlayerForm obj={player} />);
}

export default EditPlayer;
