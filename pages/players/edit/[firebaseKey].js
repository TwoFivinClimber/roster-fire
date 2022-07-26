import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSinglePlayer } from '../../../api/playerData';
import PlayerForm from '../../../components/PlayerForm';

function EditPlayer() {
  const [item, setItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePlayer(firebaseKey).then(setItem);
  }, [firebaseKey]);

  return (<PlayerForm obj={item} />);
}

export default EditPlayer;
