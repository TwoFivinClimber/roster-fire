import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Search({ players, setFilteredPlayers, onUpdate }) {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    if (value) {
      const searchResult = players.filter((player) => player.name.toLowerCase().includes(searchValue.toLowerCase()));
      setFilteredPlayers(searchResult);
    } else {
      onUpdate();
    }
  };
  return (
    <Form className="searchContainer d-flex">
      <Form.Control
        name="playerSearch"
        value={searchValue}
        onChange={handleChange}
        type="search"
        placeholder="Search Players"
        className="searchBar me-2"
        aria-label="Search"
      />
    </Form>
  );
}

Search.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    firebaseKey: PropTypes.string,
  })).isRequired,
  setFilteredPlayers: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Search;
