/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createPlayer, updatePlayer } from '../api/playerData';
import { useAuth } from '../utils/context/authContext';
import { getTeams } from '../api/teamData';

const initialState = {
  name: '',
  imageUrl: '',
  position: '',
  team: '',
  teamId: '',
  status: '',
};

function PlayerForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, []);

  useEffect(() => {
    getTeams(user.uid).then(setTeams);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'team') {
      for (const option of e.target.children) {
        if (option.value === value) {
          const teamId = 'teamId';
          const teamFbKey = option.getAttribute('teamId');
          setFormInput((prevState) => ({
            ...prevState,
            [name]: value,
            [teamId]: teamFbKey,
          }));
        }
      }
    } else {
      setFormInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePlayer(formInput).then(() => {
        router.push('/players');
      });
    } else {
      const playerObj = { ...formInput, uid: user.uid };
      createPlayer(playerObj).then(() => {
        router.push('/players');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>{obj.firebaseKey ? 'Update' : 'Add A'} Player</h2>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Player Name</Form.Label>
        <Form.Control name="name" type="text" placeholder="Enter Player Name" value={formInput.name} onChange={handleChange} />
        <Form.Label>Team</Form.Label>
        <Form.Select
          aria-label="Default select example"
          name="team"
          teamid="teamId"
          onChange={handleChange}
        >
          <option>Select A Team</option>
          {teams.map((team) => (
            <option value={team.name} teamId={team.firebaseKey} key={team.firebaseKey} selected={obj.teamId === team.firebaseKey}>{team.name}</option>
          ))};
        </Form.Select>
        <Form.Label>Image</Form.Label>
        <Form.Control name="imageUrl" type="text" placeholder="Enter Image Url" value={formInput.imageUrl} onChange={handleChange} />
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
    imageUrl: PropTypes.string,
    position: PropTypes.string,
    status: PropTypes.string,
    firebaseKey: PropTypes.string,
    team: PropTypes.string,
    teamId: PropTypes.string,
    uid: PropTypes.string,
  }),
};

PlayerForm.defaultProps = {
  obj: initialState,
};

export default PlayerForm;
