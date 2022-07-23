import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function PlayerCard({ obj }) {
  return (
    <Card>
      <Card.Header>Do I want this here ?</Card.Header>
      <Card.Body>
        <Card.Title>{obj.name}</Card.Title>
        <Card.Text>{obj.position}</Card.Text>
        <Button variant="outline-dark">Details</Button>
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
    uid: PropTypes.string,
  }).isRequired,
};

export default PlayerCard;
