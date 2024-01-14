import React, { useEffect, useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '../styles/page-style/TournamentDetail.css'; // Update the path to your CSS file
import SingleElimination from '../components/SingleElimination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt, faLocationDot, faTrophy, faUsers } from '@fortawesome/free-solid-svg-icons';
import tlogo from '../images/1.png';
import { fetchTournamentById, joinTournament } from '../services/tourService';
import TeamSelectModal from '../components/TeamSelect';
import { fetchUserTeams } from '../services/authService';

function TournamentDetail() {
  const { id } = useParams();
  const [key, setKey] = useState('overview');
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  const [tournament, setTournament] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [userTeams, setUserTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect( () => {

    async function fetchData() {
      try {
      setTournament(await fetchTournamentById(id));
      setUserTeams(await fetchUserTeams());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tournament details:', error);
      }
    }
    fetchData();
  }, [id]);

  const handleJoinTournament = async (tournamentId, teamId) => {
      await joinTournament(tournamentId, teamId).then(async res => {
        console.log('Joined tournament successfully:', res);
        setShowModal(false);
        setTournament(await fetchTournamentById(id));
      }, (error) => {
        console.error('Error while joining tournament:', error);
      });
  };

  if (loading) {
    return <Container>Loading tournament details...</Container>;
  }

  return (
    <>
      <div className="header-image">
        <div className="header-text">
          <h1 className="tournament-detail-title text">{tournament.name}</h1>
          {userTeams.length > 0 && (
            <button className="register-button text" onClick={() => setShowModal(true)}>Zapsat tým</button>
          )}
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
                    <FontAwesomeIcon icon={faListAlt} className="icon" />
                    <div>
                      <h4>Datum</h4>
                      <p>{formatDate(tournament.date)}</p>
                    </div>
                  </div>
                  <div className="card">
                    <FontAwesomeIcon icon={faTrophy} className="icon" />
                    <div>
                      <h4>Cena za výhru</h4>
                      <p>{tournament.prize}</p>
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
                      <span className="value">{tournament.teams.length}</span>
                    </div>
                    <div className="tournament-slots">
                      <span className="label">Celkem míst</span>
                      <span className="value">{tournament.sizeLimit}</span>
                    </div>
                  </div>
                  <span className="line"></span>
                  <div className="registered-teams-list">
                    <div className="teams-list">
                      {tournament.teams.map(team => (
                        <div key={team.id} className="team">
                          <img src={tlogo} alt={team.name} />
                          <div className="team-info">
                            <h4>{team.name}</h4>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="brackets" title="Brackets">
            <SingleElimination tournamentData={tournament} />
          </Tab>
        </Tabs>
      </Container>
      <TeamSelectModal
        show={showModal}
        onHide={() => setShowModal(false)}
        teams={userTeams}
        onJoinTournament={handleJoinTournament}
        tournament={tournament}
      />
    </>
  );
}

export default TournamentDetail;
