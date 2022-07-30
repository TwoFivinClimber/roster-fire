/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { getTeams } from '../api/teamData';
import { createTrade } from '../api/tradeData';

// const initialState = {
//   tradeStatus: 'open',
//   requestorUid: '',
//   requestorDisplayName: '',
//   requestorTeamId: '',
//   requestedUid: '',
//   requestedDisplayName: '',
//   requestedTeamId: '',
//   tradeMessage: '',
//   responseMessage: '',
// };

function TradeForm({ obj }) {
  const [formInput, setFormInput] = useState({});
  const [teams, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTeams(user.uid).then(setTeams);
    setFormInput({
      tradeStatus: 'open',
      requestorUid: user.uid,
      requestorTeamId: '',
      requestorDisplayName: user.displayName,
      requestedUid: obj.uid,
      requestedDisplayName: obj.displayName,
      requestedTeamId: obj.firebaseKey,
      tradeMessage: '',
      responseMessage: '',
    });
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.warn(formInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTrade(formInput).then(() => {
      router.push('/trades');
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Team To Acquire: {obj.name}</h2>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label><h4>Team To Trade ⬇️</h4></Form.Label>
        <Form.Select
          aria-label="Default select example"
          name="requestorTeamId"
          onChange={handleChange}
        >
          <option>Select A Team</option>
          {teams.map((team) => (
            <option value={team.firebaseKey} key={team.firebaseKey}>{team.name}</option>
          ))};
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label><h4>Message To Team Owner ⬇️</h4></Form.Label>
        <Form.Control name="tradeMessage" onChange={handleChange} as="textarea" rows={3} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Button variant="success" type="submit" onClick={() => router.push('/public')}>
        Cancel
      </Button>
    </Form>
  );
}

TradeForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    firebaseKey: PropTypes.string,
    isPublic: PropTypes.bool,
    uid: PropTypes.string,
    displayName: PropTypes.string,
  }),
};

TradeForm.defaultProps = {
  obj: {},
};

export default TradeForm;
