import React, { useEffect, useState } from 'react';
import { Container, Tab, Tabs, Modal, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '../styles/page-style/TournamentDetail.css';
import SingleElimination from '../components/SingleElimination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt, faLocationDot, faTrophy, faUsers } from '@fortawesome/free-solid-svg-icons';
import tlogo from '../images/1.png';
import { fetchTournamentById, joinTournament, deleteTournament, leaveTournament, editTournament, startTournament } from '../services/tourService';
import TeamSelectModal from '../components/TeamSelect';
import { fetchUserTeams, fetchUserData } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function TournamentDetail() {
  const navigate = useNavigate();
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    date: '',
    place: '',
    prize: '',
    type: ''
  });
  const [userTeams, setUserTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actualUser, setActualUser] = useState({ id: '' });
  const [actualTeamId, setActualTeamId] = useState('');


  useEffect(() => {
    async function fetchData() {
      try {
        setTournament(await fetchTournamentById(id));
        setUserTeams(await fetchUserTeams());
        fetchUserData().then(userData => {
          setActualUser({ id: userData.id });
        }).catch(error => {
          console.error('Chyba při načítání uživatelských dat:', error);
        });
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
    return <Container>Nejste přihlášený.</Container>;
  }

  const handeLeaveTournament = async (tournamentId, teamId) => {
    const isConfirmed = window.confirm("Opravdu chcete odejít z turnaje?");

    if (isConfirmed) {
      await leaveTournament(tournamentId, teamId).then(async res => {
        console.log('Leaved tournament successfully:', res);
        setTournament(await fetchTournamentById(id));
      }, (error) => {
        console.error('Error while leaving tournament:', error);
      });
    } else {
      console.log('Tournament leaving cancelled');
    }
  }

  const handleEditTournament = async (tournamentId, editedData) => {
    try {
      await editTournament(tournamentId, editedData);
      setTournament(await fetchTournamentById(id));
      setShowEditModal(false);
      console.log('Turnaj úspěšně upraven');
    } catch (error) {
      console.error('Chyba při úpravě turnaje:', error);
    }
  };

  const handleEditClick = () => {
    setEditData({
      name: tournament.name,
      date: tournament.date,
      place: tournament.place,
      prize: tournament.prize,
      type: tournament.type
    });
    setShowEditModal(true);
  };

  const handleDeleteTournament = async (tournamentId) => {
    const isConfirmed = window.confirm("Opravdu chcete smazat tento turnaj?");

    if (isConfirmed) {
      await deleteTournament(tournamentId).then(async res => {
        console.log('Deleted tournament successfully:', res);
        navigate('/mytournaments');
      }, (error) => {
        console.error('Error while deleting tournament:', error);
      });
    } else {
      console.log('Tournament deletion cancelled');
    }
  }
  const handleStartTournament = async (tournamentId) => {
    const isConfirmed = window.confirm("Opravdu chcete začít turnaj?");
    if (isConfirmed) {
      try {
        let tournamentResponse = await startTournament(tournamentId);
        console.log(tournamentResponse.data)


        setTournament(tournamentResponse.data);
        console.log("Test ", userTeams.length, tournament.teams.length, tournament.sizeLimit);
        console.log('Turnaj úspěšně začal');
      } catch (error) {
        console.error('Chyba při začínání turnaje:', error);
      }
    } else {
      console.log('Tournament starting cancelled');
    }
  };

  console.log(tournament.sizeLimit, tournament.teams.length);
  return (
    <>
      <div className="header-image">
        <div className="header-text">
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 className="tournament-detail-title text">{tournament.name}</h1>
            {actualUser.id === tournament?.owner?.id && (
              <button className='edit-btn text' onClick={handleEditClick}>Upravit</button>
            )}
            {actualUser.id === tournament?.owner?.id && tournament?.matches?.length === 0 &&  (
              <button className="register-button text" onClick={() => handleStartTournament(tournament.id)}>Začít turnaj</button>
            )
            }
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Upravit turnaj</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form className='edit-tournament-form'>
                  <div className="form-group">
                    {/* Jméno */}
                    <div className="controls">
                      <input type="text" id="name" className="floatLabel" name="name" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                      <label htmlFor="name">Jméno</label>
                    </div>

                    {/* Místo */}
                    <div className="controls">
                      <input type="text" id="place" className="floatLabel" name="place" value={editData.place} onChange={(e) => setEditData({ ...editData, place: e.target.value })} />
                      <label htmlFor="place">Místo</label>
                    </div>

                    {/* Datum a čas */}
                    <div className="controls">
                      <input type="datetime-local" id="date" className="floatLabel" name="date" value={editData.date} onChange={(e) => setEditData({ ...editData, date: e.target.value })} />
                      <label htmlFor="date">Datum a čas</label>
                    </div>

                    {/* Cena */}
                    <div className="controls">
                      <input type="text" id="prize" className="floatLabel" name="prize" value={editData.prize} onChange={(e) => setEditData({ ...editData, prize: e.target.value })} />
                      <label htmlFor="prize">Cena</label>
                    </div>

                    <div className="controls">
                      <select id="type" className="floatLabel" name="type" value={editData.type} onChange={(e) => setEditData({ ...editData, type: e.target.value })}>
                        <option value="">Vyberte typ</option>
                        <option value="4V4">4V4</option>
                        <option value="5V5">5V5</option>
                        <option value="6V6">6V6</option>
                        <option value="7V7">7V7</option>
                        <option value="8V8">8V8</option>
                        <option value="9V9">9V9</option>
                        <option value="10V10">10V10</option>
                        <option value="11V11">11V11</option>
                      </select>
                      <label htmlFor="type">Typ</label>
                    </div>


                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowEditModal(false)}>Zrušit</Button>
                <Button variant="primary" onClick={() => handleEditTournament(id, editData)}>Uložit změny</Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className='buttons-tour'>
            {userTeams.length > 0 && tournament.teams.length < tournament.sizeLimit && (
              <button className="register-button text" onClick={() => setShowModal(true)}>Zapsat tým</button>
            )}
            {
              actualUser.id === tournament.owner.id && (
                <div>
                  <button className="delete-button text" onClick={() => handleDeleteTournament(tournament.id)}>Smazat turnaj</button>
                </div>
              )}
          </div>

        </div>
      </div>
      <Container className="tournament-detail-container">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="overview" title="Přehled">
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
                <h3>Týmy</h3>
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
                      {tournament.teams.map((team) => {
                        return (
                          <div key={team.id} className="team" style={{ width: "100%", flexDirection: "row" }}>
                            <img src={tlogo} alt={team.name} />
                            <div className="team-info">
                              <h4>{team.name}</h4>
                              {!loading && (actualUser.id === tournament.owner.id || actualUser.id === team.owner.id) &&
                                (
                                  <button className="leave-button"
                                    onClick={() => handeLeaveTournament(tournament.id, team.id)}>
                                    Odejít z turnaje
                                  </button>
                                )
                              }
                            </div>
                          </div>);
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="brackets" title="Zápasy">
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