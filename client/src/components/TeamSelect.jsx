import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function TeamSelectModal({ show, onHide, teams, onJoinTournament, tournament }) {
  const teamIds = tournament.teams.map(team => team.id);
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Vyberte tým pro zapsání do turnaje</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {teams.map(team => {
          const isJoined = teamIds.includes(team.id);
          return (
            <div key={team.id} className="team-item">
              {team.name}
              <Button
                variant={isJoined ? 'success' : 'primary'}
                disabled={isJoined}
                onClick={() => onJoinTournament(tournament.id, team.id)}>
                {isJoined ? 'Zapsáno' : 'Připojit se'}
              </Button>
            </div>
          );
        })}
      </Modal.Body>
    </Modal>
  );
}

export default TeamSelectModal;
