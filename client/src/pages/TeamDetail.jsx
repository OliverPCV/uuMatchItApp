import React, { useState, useEffect } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import InviteModal from '../components/InviteModal';
import '../styles/page-style/TeamDetail.css';
import plogo from '../images/player.png';
import { fetchTeamById, removeUserFromTeam } from '../services/teamService';
import { fetchSendInvite } from '../services/inviteService';
import { fetchUserData } from '../services/authService';

function TeamDetail() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [key, setKey] = useState('overview');
  const [playersCount, setPlayersCount] = useState(0);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [actualUser, setActualUser] = useState({ id: '' });


  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const teamData = await fetchTeamById(id);
        setTeam(teamData);
        fetchUserData().then(userData => {
          setActualUser({ id: userData.id });
          console.log(userData.id);
        }).catch(error => {
          console.error('Chyba při načítání uživatelských dat:', error);
        });
        if (teamData && teamData.players) {
          setPlayersCount(teamData.players.length);
        } else {
          setPlayersCount(0);
        }
      } catch (error) {
        console.error('Error fetching team details:', error);
      }
    };

    if (id) {
      fetchTeamData();
    }
  }, [id]);

  const handleSendInvite = async (userName) => {
    const isUserAlreadyInTeam = team.players.some(player => player.username === userName);
    if (isUserAlreadyInTeam) {
      console.error('Uživatel již je v týmu.');
      return;
    }
    console.log('Odesílání pozvánky uživateli:', userName);
    try {
      await fetchSendInvite(id, userName);
      console.log('Pozvánka byla úspěšně odeslána.');
      setShowInviteModal(false);
    } catch (error) {
      console.error('Chyba při odesílání pozvánky:', error);
    }
  };

  const handleRemovePlayerFromTeam = async (playerId) => {
    console.log('Odebírání hráče z týmu:', playerId);
    try {
      await removeUserFromTeam(id, playerId);
      console.log('Hráč byl úspěšně odebrán z týmu.');
      setTeam(await fetchTeamById(id));
      
    } catch (error) {
      console.error('Chyba při odebírání hráče z týmu:', error);

    }
  };

  if (!team) {
    return <Container>Loading team details...</Container>;
  }

  return (
    <><div className="header-image">
      <div className="header-text">
        <h1 className="tournament-detail-title text">{team.name}</h1>
        <button className="register-button text" onClick={() => setShowInviteModal(true)}>Pozvat uživatele</button>
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
            <div className="column-container">
              <div className="left-column">
                <h3>Vlastník</h3>
                <div className="card players-box">
                  <div className="teams-list">
                    <div key={team.owner.id} className="team">
                      <img src={plogo} alt={team.owner.username} />
                      <div className="team-info">
                        <h4>{team.owner.username}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right-column">
                <h3>Hráči</h3>
                <div className="card players-box">
                  <div className="tournament-stats">
                    <div className="registered-teams">
                      <span className="label">Registrováno</span>
                      <span className="value">{playersCount}</span>
                    </div>
                  </div>
                  <span className='line'></span>
                  <div className="registered-teams-list">
                    {team.players.map(player => (
                      <div key={player.id} className="team">
                        <img src={plogo} alt={player.username} />
                        <div className="team-info">
                          <h6>{player.username}</h6>
                          {
                            actualUser.id === team.owner.id &&
                            <button className="delete-button text" onClick={() => handleRemovePlayerFromTeam(player.id)}>Odebrat</button>
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </Container>
      <InviteModal
        show={showInviteModal}
        onHide={() => setShowInviteModal(false)}
        onSendInvite={handleSendInvite}
      />
    </>
  );
}

export default TeamDetail;
