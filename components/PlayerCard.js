import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deletePlayer } from '../api/playerData';

function PlayerCard({ obj, onUpdate }) {
  const deleteThisPLayer = () => {
    deletePlayer(obj.firebaseKey).then(() => onUpdate());
  };

  return (
    <Card>
      <Card.Header>Do I want this here ?</Card.Header>
      <Card.Body>
        <Card.Title>{obj.name}</Card.Title>
        <Card.Text>{obj.position}</Card.Text>
        <Link href={`/players/edit/${obj.firebaseKey}`} passHref>
          <Button variant="outline-dark">Details</Button>
        </Link>
        <Button variant="outline-danger" onClick={deleteThisPLayer}>Delete</Button>
      </Card.Body>
    </Card>
  );
}

PlayerCard.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    position: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlayerCard;
