import React, { useState, useEffect } from 'react';
import { user as mockUser } from '../data/user'; // Import mock data
import '../styles/page-style/UserProfile.css'; // Cesta k vašemu CSS

function UserProfile({ loggedIn }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (loggedIn) {
      // Pokud je uživatel přihlášen, načtěte jeho údaje
      setName(mockUser.name);
      setEmail(mockUser.email);
    }
  }, [loggedIn]);

  const handleSaveProfile = () => {
    // Implementace logiky pro uložení profilu
    alert('Profile Saved');
  };

  if (!loggedIn) {
    // Zobrazí tlačítka pro přihlášení a registraci, pokud uživatel není přihlášen
    return (
      <div className="container mt-5 mb-5 text-center">
        <button className="btn btn-primary m-2">Log In</button>
        <button className="btn btn-secondary m-2">Register</button>
      </div>
    );
  }

  // Zobrazí uživatelský profil, pokud je uživatel přihlášen
  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="User" />
            <span className="font-weight-bold">{name}</span>
            <span className="text-black-50">{email}</span>
          </div>
        </div>
        <div className="col-md-9">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">Name</label>
                <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
            <div className="mt-5 text-center">
              <button className="btn btn-primary profile-button" type="button" onClick={handleSaveProfile}>Save Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
