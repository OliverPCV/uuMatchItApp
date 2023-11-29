import React, { useState, useEffect } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import tournaments from '../data/tournaments';
import '../styles/page-style/TournamentDetail.css'; // Update the path to your CSS file
import SingleElimination from '../components/SingleElimination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faClock, faUsers, faTrophy, faListAlt, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import teamlogo from '../images/1.png'

function TournamentDetail() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [key, setKey] = useState('overview'); // Přidání stavu pro záložky

  useEffect(() => {
    const foundTournament = tournaments.find(t => t.id.toString() === id);
    setTournament(foundTournament);
  }, [id]);

  if (!tournament) {
    return <Container>Loading tournament details...</Container>;
  }

  return (
    <><div className="header-image">
      <div className="header-text">
        <h1 className="tournament-detail-title text">{tournament.name}</h1>
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
            <div className="overview-container">
              <div className="left-column">
                {/* Sekce s informacemi */}
                <div className="information-section">
                  <h3>Information</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse voluptas impedit amet rerum. Voluptas praesentium modi, ad esse est ipsam ut provident, neque facilis dolorem eaque aliquid ullam nam doloremque!</p>
                </div>

                {/* Flex kontejner pro kartičky */}
                <h3>Format</h3>
                <div className="cards-container">
                  <div className="card">
                    <FontAwesomeIcon icon={faLocationDot} className="icon" />
                    <div>
                      <h4>Address</h4>
                      <p>Úvaly 10</p>
                    </div>
                  </div>
                  <div className="card">
                    <FontAwesomeIcon icon={faClock} className="icon" />
                    <div>
                      <h4>Check-in period</h4>
                      <p>45 minutes before start</p>
                    </div>
                  </div>
                  {/* Další kartičky */}
                </div>
                <div className="cards-container">
                  <div className="card">
                    <FontAwesomeIcon icon={faUsers} className="icon" />
                    <div>
                      <h4>Team size</h4>
                      <p>5v5</p>
                    </div>
                  </div>
                  <div className="card">
                    <FontAwesomeIcon icon={faTrophy} className="icon" />
                    <div>
                      <h4>Prize pool</h4>
                      <p>1mil€</p>
                    </div>
                  </div>
                  <div className="card">
                    <FontAwesomeIcon icon={faListAlt} className="icon" />
                    <div>
                      <h4>Format</h4>
                      <p>Single Elimination</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="right-column">
                <h3>Teams</h3>
                <div className="card players-box">
                  <div className="tournament-stats">
                    <div className="registered-teams">
                      <span className="label">Registrováno</span>
                      <span className="value">8</span>
                    </div>
                    <div className="tournament-slots">
                      <span className="label">Slots</span>
                      <span className="value">16</span>
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
          <Tab eventKey="brackets" title="Brackets">
            <SingleElimination />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}

export default TournamentDetail;