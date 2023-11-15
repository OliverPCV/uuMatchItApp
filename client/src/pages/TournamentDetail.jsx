import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import tournaments from '../data/tournaments';

function TournamentDetail() {
  const { id } = useParams();
  console.log("Tournament ID:", id);
  const [tournament, setTournament] = useState(null);

  useEffect(() => {
    const foundTournament = tournaments.find(t => t.id.toString() === id);
    console.log("Found Tournament:", foundTournament);
    setTournament(foundTournament);
  }, [id]);

  if (!tournament) {
    return <Container>Loading tournament details...</Container>;
  }

  return (
    <Container>
      <h1>Detail turnaje: {tournament.name}</h1>
      <p>Datum: {tournament.date}</p>
      <p>Místo: {tournament.place}</p>
      <p>Cena: {tournament.prize} Kč</p>
      <p>Typ: {tournament.type}</p>
      <p>Počet týmů: {tournament.teams.length}</p>
      <p>Dokončeno: {tournament.isFinished ? 'Ano' : 'Ne'}</p>
    </Container>
  );
}

export default TournamentDetail;
