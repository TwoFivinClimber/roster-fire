/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { getTrades } from '../api/tradeData';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const [trades, setTrades] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    getTrades().then((tradesArray) => {
      const userTrades = tradesArray.filter((tradeTaco) => tradeTaco.requestedUid === user.uid || tradeTaco.requestorUid === user.uid);
      setTrades(userTrades);
    });
  }, [trades]);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Roster Fire</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/teams">
              <Nav.Link>Teams</Nav.Link>
            </Link>
            <Link passHref href="/players">
              <Nav.Link>Players</Nav.Link>
            </Link>
            <Link passHref href="/newTeam">
              <Nav.Link>New Team</Nav.Link>
            </Link>
            <Link passHref href="/newPlayer">
              <Nav.Link>New Player</Nav.Link>
            </Link>
            <Link passHref href="/public">
              <Nav.Link>Public League</Nav.Link>
            </Link>
            <Link passHref href="/trades">
              <Nav.Link className={trades.length ? '' : 'noShow'}>Trades</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
