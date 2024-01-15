import React, { useState, useEffect } from 'react';
import { fetchUserData } from '../services/authService'; // Import funkce pro načtení uživatelských dat
import '../styles/page-style/UserProfile.css'; // Cesta k vašemu CSS
import IncomingInvites from '../components/IncomingInvites';
import { fetchTeamData } from '../services/teamService';
import TeamCard from '../components/TeamCard';

function UserProfile() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({ id: '', username: '', email: '' });
  const [userTeams, setUserTeams] = useState([]);


  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
      fetchUserData().then(userData => {
        setUser({ id: userData.id, username: userData.username, email: userData.email });
      }).catch(error => {
        console.error('Chyba při načítání uživatelských dat:', error);
      });
    }
  }, [loggedIn]);

  const handleSaveProfile = () => {
    // Implementace logiky pro uložení profilu
    alert('Profile Saved');
  };

  const handleTeamsWhereUserIsPlayer = () => {
    const userTeams = [];
    const teams =  fetchTeamData();

    teams.forEach(team => {
      const isUserInTeam = team.players.some(player => player.id === user.id);
      console.log('User is in team:', team);

      if (isUserInTeam) {
        setUserTeams(userTeams.push(team));
      }
    });

    return userTeams;
  };

  if (!loggedIn) {
    // Zobrazí tlačítka pro přihlášení a registraci, pokud uživatel není přihlášen
    return (
      <h4 Uživatel className="text-right">Uživatel není přihlášený</h4>
    );
  }

  // Zobrazí uživatelský profil, pokud je uživatel přihlášen
  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="User" />
            <span className="font-weight-bold">{user.username}</span>
            <span className="text-black-50">{user.email}</span>
          </div>
        </div>
        <div className="col-md-9">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Uživatelský profil</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="user-profile-content">
        <IncomingInvites />
      </div>
      <div className='myt-main'>
      <h3>Moje týmy:</h3>
      {userTeams.length > 0 ? (
        userTeams.map(team => (
          <TeamCard key={team.id} data={team} />
        ))
      ) : (
        <p>Nejste přihlášený.</p>
      )}
    </div>
    </div>
  );
}

export default UserProfile;
