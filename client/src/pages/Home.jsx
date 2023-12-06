import React, { useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import TournamentCard from '../components/TournamentCard';
import '../styles/page-style/Home.css';
import img1 from "../images/IMG_1246.jpg";
import tournaments from '../data/tournaments'; 
import { useNavigate } from 'react-router-dom';

function Home() {
  let navigate = useNavigate();
  const tournamentRef = useRef(null);
  const [filter, setFilter] = useState('all');

  const scrollToTournaments = () => {
    tournamentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const goToTournamentCreate = () => {
    navigate('/tournamentcreate');
  };

  const goToTeamCreate = () => {
    navigate('/teamcreate');
  };


  const handleFilter = (newFilter) => {
    setFilter(newFilter);
  };


  if (!Array.isArray(tournaments)) {
    console.error('shoppingLists is not an array');
    return <div>Error: Data not loaded correctly</div>;
  }

  const filteredTournaments = filter === 'all' ? tournaments : tournaments.filter(tournament => tournament.type === filter);

  return (
    <>
      <div className='main'>
        <div className="lefttext">
          <div className="textwrap">
            <p>Pojďte si zahrát fotbalový turnaj! Přihlaste se a zúčastněte se s vaším týmem a ukažte své dovednosti na trávě.</p>
            <button onClick={scrollToTournaments}>Procházet Turnaje</button>
            <button onClick={goToTournamentCreate}>Vytvořit Turnaj</button>
            <button onClick={goToTeamCreate}>Vytvořit Tým</button>
          </div>
        </div>
        <div className="rightimage">
          <img src={img1} alt="Logo" />
        </div>
      </div>

      <Container>
        <div className="filter-buttons">
          <button onClick={() => handleFilter('all')}>Vše</button>
          <button onClick={() => handleFilter('5V5')}>5v5</button>
          <button onClick={() => handleFilter('11V11')}>11v11</button>
        </div>
        <h3 ref={tournamentRef}>Všechny turnaje:</h3>
        {Array.isArray(filteredTournaments) && filteredTournaments.map(tournament => (
          <TournamentCard key={tournament.id} data={tournament} />
        ))}
      </Container>
    </>
  );
}

export default Home;
