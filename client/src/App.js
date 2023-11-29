import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import TournamentDetail from './pages/TournamentDetail';
import './App.css';
import AppNavbar from './components/Navbar';
import Appfooter from "./components/Footer";
import NoPage from './pages/NoPage';
import TournamentCreate from './pages/TournamentCreate';
import UserProfile from './pages/UserProfile';
import TeamCreate from './pages/TeamCreate';
import MyTeams from './pages/MyTeams';
import MyTournaments from './pages/MyTournaments';
import { user as mockUser } from '..//src/data/user'; // Import mockUser

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = () => {
    setUser(mockUser);
    sessionStorage.setItem('user', JSON.stringify(mockUser));
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  return (
      <BrowserRouter>
    <div className="app-container">

      <AppNavbar user={user} onLogin={handleLogin} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tournamentcreate" element={<TournamentCreate />} />
          <Route path="/teamCreate" element={<TeamCreate />} />
          <Route path="/myteams" element={<MyTeams />} />
          <Route path="/teamDetail" element={<TournamentDetail />} />
          <Route path="/tournamentdetail/:id" element={<TournamentDetail />} />
          <Route path="/userprofile" element={<UserProfile loggedIn={user !== null} />} />
          <Route path="/myTournaments" element={<MyTournaments />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
    </div>
    <Appfooter />


      </BrowserRouter>
  );
}

export default App;
