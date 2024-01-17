import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { editMatch } from '../services/tourService';

function MatchUpdate({ matchData, onHide, tournamentId }) {

    const [team1Goals, setTeam1Goals] = useState('');
    const [team2Goals, setTeam2Goals] = useState('');

    console.log('Turnaj id:', tournamentId);

    const handleSubmit = () => {
        let updatedData = [
            {teamId: matchData.match.participants[0].team.id, score: parseInt(team1Goals)},
            {teamId: matchData.match.participants[1].team.id, score: parseInt(team2Goals)}
        ];
console.log(updatedData);
        editMatch(tournamentId, matchData.match.id, updatedData)
            .then(() => {
                console.log('Zápas byl úspěšně upraven.');
                console.log(updatedData);
                onHide();
            })
            .catch((error) => {
                console.error('Chyba při úpravě zápasu:', error);
            });
    };

    console.log(matchData.match)
    return (
        <Modal show={true} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Výsledek zápasu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Počet gólů týmu {matchData.match.participants[0].name}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Zadejte počet gólů"
                            value={team1Goals}
                            onChange={(e) => setTeam1Goals(e.target.value)}
                        />
                        <Form.Label>Počet gólů týmu {matchData.match.participants[1].name}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Zadejte počet gólů"
                            value={team2Goals}
                            onChange={(e) => setTeam2Goals(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleSubmit}>
                        Odeslat změnu
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default MatchUpdate;
