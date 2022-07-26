import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createPlayer, updatePlayer } from '../api/playerData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  name: '',
  position: '',
  status: '',
};

function PlayerForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePlayer(formInput).then(() => {
        router.push('/team');
      });
    } else {
      const playerObj = { ...formInput, uid: user.uid };
      createPlayer(playerObj).then(() => {
        router.push('/team');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>{obj.firebaseKey ? 'Update' : 'Add'} Player</h2>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Player Name</Form.Label>
        <Form.Control name="name" type="text" placeholder="Enter Player Name" value={formInput.name} onChange={handleChange} />
        <Form.Label>Position</Form.Label>
        <Form.Control name="position" type="text" placeholder="Enter Player Position" value={formInput.position} onChange={handleChange} />
        <Form.Label>Player Status</Form.Label>
        <Form.Control name="status" type="text" placeholder="Active, Injured, On Leave ?" value={formInput.status} onChange={handleChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        {obj.firebaseKey ? 'Update' : 'Submit'}
      </Button>
      <Button variant="success" type="submit" onClick={() => router.push('/team')}>
        Cancel
      </Button>
    </Form>
  );
}

PlayerForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    status: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
};

PlayerForm.defaultProps = {
  obj: initialState,
};

export default PlayerForm;
