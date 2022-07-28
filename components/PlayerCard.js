import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deletePlayer } from '../api/playerData';

function PlayerCard({ obj, onUpdate }) {
  const deleteThisPLayer = () => {
    if (window.confirm('Delete This Player?')) {
      deletePlayer(obj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card>
      <Card.Header>obj.team</Card.Header>
      <Card.Body>
        <div className="cardBody">
          <Card.Img className="playerImg" variant="left" src={obj.imageUrl} />
          <div className="cardText">
            <Card.Title>{obj.name}</Card.Title>
            <Card.Text>{obj.team || 'Free Agent'}</Card.Text>
            <Card.Text>{obj.position}</Card.Text>
            <Card.Text>{obj.status}</Card.Text>
          </div>
          <div>
            <Link href={`/players/edit/${obj.firebaseKey}`} passHref>
              <Button variant="outline-dark">Edit</Button>
            </Link>
            <Button variant="outline-danger" onClick={deleteThisPLayer}>Delete</Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

PlayerCard.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    position: PropTypes.string,
    status: PropTypes.string,
    team: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlayerCard;
