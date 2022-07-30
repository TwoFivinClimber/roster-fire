import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function TradePlayerCard({ obj }) {
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
        </div>
      </Card.Body>
    </Card>
  );
}

TradePlayerCard.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    position: PropTypes.string,
    status: PropTypes.string,
    team: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

export default TradePlayerCard;
