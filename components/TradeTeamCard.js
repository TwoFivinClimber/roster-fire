import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';

function TradeTeamCard({ obj }) {
  return (
    <Card>
      <Card.Img className="teamImg" variant="top" src={obj.imageUrl} />
      <Card.Body>
        <Card.Title>{obj.name}</Card.Title>
        <Card.Text>{obj.location}</Card.Text>
        <Card.Text>Manager: {obj.manager}</Card.Text>
      </Card.Body>
      <Link href={`/trades/${obj.firebaseKey}`} passHref>
        <Button variant="dark">View</Button>
      </Link>
    </Card>
  );
}

TradeTeamCard.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    location: PropTypes.string,
    manager: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

export default TradeTeamCard;
