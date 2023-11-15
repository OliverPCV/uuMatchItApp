import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import TournamentDetail from './pages/TournamentDetail';
import './App.css';
import AppNavbar from './components/Navbar';
import Appfooter from "./components/Footer"
import NoPage from './pages/NoPage';
import TournamentCreate from './pages/TournamentCreate';

function App() {
  return (
    <><><AppNavbar></AppNavbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route index element={<Home />} />
          <Route path="/tournamentdetail" element={<TournamentDetail />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/tournamentcreate" element={<TournamentCreate />} />
        </Routes>
      </BrowserRouter>
    </><Appfooter></Appfooter></>
  );
}

export default App;

