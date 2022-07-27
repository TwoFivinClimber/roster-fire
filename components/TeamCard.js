import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deleteTeam } from '../api/teamData';

function TeamCard({ obj, onUpdate }) {
  const deleteThisTeam = () => {
    deleteTeam(obj.firebaseKey).then(() => onUpdate());
  };

  return (
    <Card>
      <Card.Img className="teamImg" variant="top" src={obj.imageUrl} />
      <Card.Body>
        <Card.Title>{obj.name}</Card.Title>
        <Card.Text>{obj.location}</Card.Text>
        <Card.Text>{obj.manager}</Card.Text>
      </Card.Body>
      <Link href={`/teams/edit/${obj.firebaseKey}`} passHref>
        <Button variant="outline-dark">Edit</Button>
      </Link>
      <Button variant="outline-danger" onClick={deleteThisTeam}>Delete</Button>
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
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TeamCard;
