import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createTeam, updateTeam } from '../api/teamData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  name: '',
  location: '',
  isPublic: false,
};

function TeamForm({ obj }) {
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
      updateTeam(formInput).then(() => {
        router.push('/teams');
      });
    } else {
      const teamObj = { ...formInput, uid: user.uid };
      createTeam(teamObj).then(() => {
        router.push('/teams');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>{obj.firebaseKey ? 'Update' : 'Add'} Team</h2>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Team Name</Form.Label>
        <Form.Control name="name" type="text" placeholder="Enter Team Name" value={formInput.name} onChange={handleChange} />
        <Form.Label>Location</Form.Label>
        <Form.Control name="location" type="text" placeholder="Enter Team Location" value={formInput.location} onChange={handleChange} />
        <Form.Label>Team Image</Form.Label>
        <Form.Control name="imageUrl" type="text" placeholder="Enter Team Image" value={formInput.imageUrl} onChange={handleChange} />
        <Form.Label>Manager</Form.Label>
        <Form.Control name="manager" type="text" placeholder="Enter Team Manager" value={formInput.manager} onChange={handleChange} />
        <Form.Check
          className="text-white mb-3"
          type="switch"
          id="isPublic"
          name="isPublic"
          label="Public Team ?"
          checked={formInput.isPublic}
          onChange={(e) => setFormInput((prevState) => ({
            ...prevState,
            isPublic: e.target.checked,
          }))}
        />
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

TeamForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    firebaseKey: PropTypes.string,
    isPublic: PropTypes.bool,
    uid: PropTypes.string,
  }),
};

TeamForm.defaultProps = {
  obj: initialState,
};

export default TeamForm;
