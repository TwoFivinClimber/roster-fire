import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deletePlayer } from '../api/playerData';
import { useAuth } from '../utils/context/authContext';

function PlayerCard({ obj, onUpdate }) {
  const { user } = useAuth();
  const deleteThisPLayer = () => {
    if (window.confirm('Delete This Player?')) {
      deletePlayer(obj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card>
      <Card.Header>{obj.team}</Card.Header>
      <Card.Body>
        <div className="cardBody">
          <Card.Img className="playerImg" variant="left" src={obj.imageUrl} />
          <div className="cardText">
            <Card.Title>Name: {obj.name}</Card.Title>
            <Card.Text>Team: {obj.team || 'Free Agent'}</Card.Text>
            <Card.Text>Position: {obj.position}</Card.Text>
            <Card.Text>Status: {obj.status}</Card.Text>
          </div>
          <div>
            <Link href={`/players/edit/${obj.firebaseKey}`} passHref>
              <Button className={obj.uid !== user.uid ? 'noShow' : ''} variant="outline-dark">Edit</Button>
            </Link>
            <Button className={obj.uid !== user.uid ? 'noShow' : ''} variant="outline-danger" onClick={deleteThisPLayer}>Delete</Button>
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
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlayerCard;
