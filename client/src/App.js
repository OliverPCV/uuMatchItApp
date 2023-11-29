import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import TournamentDetail from './pages/TournamentDetail';
import './App.css';
import AppNavbar from './components/Navbar';
import Appfooter from "./components/Footer"
import NoPage from './pages/NoPage';
import TournamentCreate from './pages/TournamentCreate';
import UserProfile from './pages/UserProfile';
import TeamCreate from './pages/TeamCreate';
import MyTeams from './pages/MyTeams';
import MyTournaments from './pages/MyTournaments';

function App() {
  return (
    <div className="app-container">
      <AppNavbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route index element={<Home />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/tournamentcreate" element={<TournamentCreate />} />
          <Route path="/teamCreate" element={<TeamCreate />} />
          <Route path="/myteams" element={<MyTeams />} />
          <Route path="/teamDetail" element={<TournamentDetail />} />
          <Route path="/tournamentdetail/:id" element={<TournamentDetail />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/myTournaments" element={<MyTournaments />} />
        </Routes>
      </BrowserRouter>
      <Appfooter />
    </div>
  );
}

export default App;

