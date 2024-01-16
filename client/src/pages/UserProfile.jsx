import React, { useState, useEffect } from 'react';
import { fetchUserData } from '../services/authService'; 
import '../styles/page-style/UserProfile.css';
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
      fetchTeamData()
        .then(data => {
          setUserTeams(data);
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      fetchUserData().then(data => {
        setUser({ id: data.id, username: data.username, email: data.email });
      }
      ).catch(error => {
        console.error('Error fetching user data:', error);
      });

    }
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <h4 Uživatel className="text-right">Uživatel není přihlášený</h4>
    );
  }

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
        <p>Nejste v žádném týmu</p>
      )}
    </div>
    </div>
  );
}

export default UserProfile;
