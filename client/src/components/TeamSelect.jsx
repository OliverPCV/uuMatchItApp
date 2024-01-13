import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function TeamSelectModal({ show, onHide, teams, onJoinTournament, tournamentId }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Vyberte tým pro zapsání do turnaje</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {teams.map(team => (
          <div key={team.id} className="team-item">
            {team.name}
            <Button 
              variant="primary" 
              onClick={() => onJoinTournament(tournamentId, team.id)}>
              Připojit se
            </Button>
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
}

export default TeamSelectModal;
