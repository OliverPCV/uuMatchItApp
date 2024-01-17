import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { editMatch } from '../services/tourService';

function MatchUpdate({ matchData, onHide, tournamentId }) {

    const [team1Goals, setTeam1Goals] = useState('');
    const [team2Goals, setTeam2Goals] = useState('');

    console.log('Turnaj id:', tournamentId);



    const handleSubmit = () => {
        const team1IsWinner = parseInt(team1Goals) > parseInt(team2Goals);
        const team2IsWinner = parseInt(team1Goals) < parseInt(team2Goals);

        const updatedMatchData = {
            
            ...matchData.match,
            
            participants: [
                {
                    ...matchData.match.participants[0],
                    goals: parseInt(team1Goals),
                    isWinner: team1IsWinner
                },
                {
                    ...matchData.match.participants[1],
                    goals: parseInt(team2Goals),
                    isWinner: team2IsWinner
                }
            ]
        };

        editMatch(tournamentId, updatedMatchData)
            .then(() => {
                console.log('Zápas byl úspěšně upraven.');
                console.log(updatedMatchData);
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