import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleTeam } from '../../../api/teamData';
import TeamForm from '../../../components/TeamForm';

function EditTeam() {
  const [team, setTeam] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setTeam);
  }, [firebaseKey]);

  return (<TeamForm obj={team} />);
}

export default EditTeam;
