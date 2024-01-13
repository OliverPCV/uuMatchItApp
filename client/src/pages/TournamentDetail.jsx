import React, { useState, useEffect } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '../styles/page-style/TournamentDetail.css'; // Update the path to your CSS file
import SingleElimination from '../components/SingleElimination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faClock, faUsers, faTrophy, faListAlt, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import teamlogo from '../images/1.png'
import { fetchTournamentById } from '../services/tourService';

function TournamentDetail() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [key, setKey] = useState('overview');

  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        const tournamentData = await fetchTournamentById(id);
        setTournament(tournamentData);
      } catch (error) {
        console.error('Error fetching tournament details:', error);
      }
    };

    if (id) {
      fetchTournamentData();
    }
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
                <div className="cards-container">
                  <div className="card">
                    <FontAwesomeIcon icon={faLocationDot} className="icon" />
                    <div>
                      <h4>Addresa</h4>
                      <p>{tournament.place}</p>
                    </div>
                  </div>
                  <div className="card">
                    <FontAwesomeIcon icon={faUsers} className="icon" />
                    <div>
                      <h4>Velikost týmů</h4>
                      <p>{tournament.type}</p>
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
                      <h4>Cena za výhru</h4>
                      <p>{tournament.prize}</p>
                    </div>
                  </div>
                  <div className="card">
                    <FontAwesomeIcon icon={faListAlt} className="icon" />
                    <div>
                      <h4>Datum</h4>
                      <p>{tournament.date}</p>
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