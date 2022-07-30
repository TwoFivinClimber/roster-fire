import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { dissolveTeam } from '../api/mergedData';
import { useAuth } from '../utils/context/authContext';

function TeamCard({ obj }) {
  const router = useRouter();
  const { user } = useAuth();
  const deleteThisTeam = () => {
    if (window.confirm('Delete This Team?  All Players Will Become Free Agents')) {
      dissolveTeam(obj.firebaseKey).then(() => router.push('/teams'));
    }
  };

  return (
    <Card>
      <Card.Img className="teamImg" variant="top" src={obj.imageUrl} />
      <Card.Body>
        <Card.Title>{obj.name}</Card.Title>
        <Card.Text>{obj.location}</Card.Text>
        <Card.Text>{obj.manager}</Card.Text>
      </Card.Body>
      <Link href={`/teams/${obj.firebaseKey}`} passHref>
        <Button variant="dark">View</Button>
      </Link>
      <Link href={`/teams/edit/${obj.firebaseKey}`} passHref>
        <Button className={obj.uid !== user.uid ? 'noShow' : ''} variant="outline-dark">Edit</Button>
      </Link>
      <Button className={obj.uid !== user.uid ? 'noShow' : ''} variant="danger" onClick={deleteThisTeam}>Delete</Button>
      <Link href={`/trades/request/${obj.firebaseKey}`} passHref>
        <Button className={obj.uid === user.uid ? 'noShow' : ''} variant="warning">Request Trade</Button>
      </Link>
    </Card>
  );
}

TeamCard.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    location: PropTypes.string,
    manager: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

export default TeamCard;
