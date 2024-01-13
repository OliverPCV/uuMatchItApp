import React, { useState, useEffect } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '../styles/page-style/TeamDetail.css'; // Update the path to your CSS file
import teamlogo from '../images/1.png';
import { fetchTeamById } from '../services/teamService';


function TeamDetail() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [key, setKey] = useState('overview'); // Přidání stavu pro záložky

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const teamData = await fetchTeamById(id);
        setTeam(teamData);
      } catch (error) {
        console.error('Error fetching team details:', error);
      }
    };

    if (id) {
      fetchTeamData();
    }
  }, [id]);

  if (!team) {
    return <Container>Loading team details...</Container>;
  }

  return (
    <><div className="header-image">
      <div className="header-text">
        <h1 className="tournament-detail-title text">{team.name}</h1>
        <button className="register-button text">Register</button>
      </div>
    </div>
      <Container className="tournament-detail-container">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="overview" title="Overview">
              <div className="left-column">
              <div className="right-column">
                <h3>Hráči</h3>
                <div className="card players-box">
                  <div className="tournament-stats">
                    <div className="registered-teams">
                      <span className="label">Registrováno</span>
                      <span className="value">8</span>
                    </div>
                  </div>
                  <span className='line'></span>
                  <div className="registered-teams-list">
                    <div><img src={teamlogo} alt="Team Name"/><span>Team Name</span></div>
                    <div><img src={teamlogo} alt="Team Name"/><span>Team Name</span></div>
                    <div><img src={teamlogo} alt="Team Name"/><span>Team Name</span></div>
                    <div><img src={teamlogo} alt="Team Name"/><span>Team Name</span></div>
                    <div><img src={teamlogo} alt="Team Name"/><span>Team Name</span></div>
                    <div><img src={teamlogo} alt="Team Name"/><span>Team Name</span></div>

                  </div>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}

export default TeamDetail;