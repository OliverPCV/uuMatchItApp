import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import tournaments from '../data/tournaments';
import '../styles/page-style/TournamentDetail.css'; // Update the path to your CSS file

function TournamentDetail() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);

  useEffect(() => {
    const foundTournament = tournaments.find(t => t.id.toString() === id);
    setTournament(foundTournament);
  }, [id]);

  if (!tournament) {
    return <Container>Loading tournament details...</Container>;
  }

  return (
    <Container className="tournament-detail-container">
      <h1 className="tournament-detail-title">Detail turnaje: {tournament.name}</h1>
      <p className="tournament-detail-text">Datum: {tournament.date}</p>
      <p className="tournament-detail-text">Místo: {tournament.place}</p>
      <p className="tournament-detail-text">Cena: {tournament.prize} Kč</p>
      <p className="tournament-detail-text">Typ: {tournament.type}</p>
      <p className="tournament-detail-text">Počet týmů: {tournament.teams.length}</p>
      <p className="tournament-detail-text">Dokončeno: {tournament.isFinished ? 'Ano' : 'Ne'}</p>
    </Container>
  );
}

export default TournamentDetail;
