import React, { useState, useEffect } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '../styles/page-style/TournamentDetail.css'; // Update the path to your CSS file
import SingleElimination from '../components/SingleElimination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUsers, faTrophy, faListAlt, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import tlogo from '../images/1.png'
import { fetchTournamentById, joinTournament } from '../services/tourService';
import TeamSelectModal from '../components/TeamSelect';
import { fetchUserTeams } from '../services/authService';
import { fetchTeamById } from '../services/teamService';
import { fetchUserData } from '../services/authService';

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
      minute: '2-digit'
    });
  };
  const [tournament, setTournament] = useState(null);
  const [teamsCount, setTeamsCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [userTeams, setUserTeams] = useState([]);
  const [teamsData, setTeamsData] = useState([{}]);
  const [userId, setUserId] = useState('');
  const [teamOwners, setTeamOwners] = useState([]);

  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        const tournamentData = await fetchTournamentById(id);
        setTournament(tournamentData);
        setTeamsData(tournamentData.teams);
        if (tournamentData && tournamentData.teams) {
          setTeamsCount(tournamentData.teams.length);
          const teams = tournamentData.teams;
          const teamDetailsPromises = teams.map(team => fetchTeamById(team.id));
          const teamDetails = await Promise.all(teamDetailsPromises);
          const teamOwners = teamDetails.map(team => team.owner);
          setTeamOwners(teamOwners);
          const actualUserToken = sessionStorage.getItem('token');
          const actualUserData = await fetchUserData(actualUserToken);
          const actualUserId = actualUserData.id;
          const ids = teamOwners.map(user => user.id);
          setTeamOwners(ids);
          setUserId(actualUserId);
        } else {
          setTeamsCount(0);
        }
      } catch (error) {
        console.error('Error fetching tournament details:', error);
        setTeamsCount(0);
      }
    };
    if (id) {
      fetchTournamentData();
    }
  }, [id]);

  const handleRegisterClick = async () => {
    try {
      const teams = await fetchUserTeams();
      setUserTeams(teams);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching user teams:', error);
    }
  };

  const handleJoinTournament = async (tournamentId, teamId) => {
    try {
      const response = await joinTournament(tournamentId, teamId);
      console.log('Joined tournament successfully:', response);
      setShowModal(false);
    } catch (error) {
      console.error('Error while joining tournament:', error);
    }
  };

  const getTeamOwnerThroughTournament = (tournament) => {
    if (tournament && tournament.teams && tournament.teams.length > 0) {
      return tournament.teams[0].owner;
    }
    return null;
  };

  if (!tournament) {
    return <Container>Loading tournament details...</Container>;
  }

  const userIsTeamOwner = teamOwners.includes(userId);

  return (
    <><div className="header-image">
      <div className="header-text">
        <h1 className="tournament-detail-title text">{tournament.name}</h1>
        {!userIsTeamOwner && (
          <button className="register-button text" onClick={handleRegisterClick}>Zapsat tým</button>
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
                      <span className="value">{teamsCount}</span>
                    </div>
                    <div className="tournament-slots">
                      <span className="label">Celkem míst</span>
                      <span className="value">{tournament.sizeLimit}</span>
                    </div>
                  </div>
                  <span className='line'></span>
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
        tournamentId={id}
      />
    </>
  );
}

export default TournamentDetail;