import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import TournamentCard from '../components/TournamentCard';
import '../styles/page-style/Home.css';
import img1 from "../images/IMG_1246.jpg";
import { useNavigate } from 'react-router-dom';
import { fetchTournaments } from '../services/tourService';

function Home() {
  let navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTournaments()
      .then(data => {
        setTournaments(data); 
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  console.log(tournaments);

  const scrollToTournaments = () => {
    tournaments.current?.scrollIntoView({ behavior: 'smooth' });
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
          <button onClick={() => handleFilter('4v4')}>4V4</button>
          <button onClick={() => handleFilter('5v5')}>5v5</button>
          <button onClick={() => handleFilter('6V6')}>6V6</button>
          <button onClick={() => handleFilter('7V7')}>7V7</button>
          <button onClick={() => handleFilter('8V8')}>8V8</button>
          <button onClick={() => handleFilter('9V9')}>9V9</button>
          <button onClick={() => handleFilter('10V10')}>10V10</button>
          <button onClick={() => handleFilter('11V11')}>11v11</button>
        </div>
        <h3 ref={tournaments}>Všechny turnaje:</h3>
        {Array.isArray(filteredTournaments) && filteredTournaments.map(tournament => (
          <TournamentCard key={tournament.id} data={tournament} />
        ))}
      </Container>
    </>
  );
}

export default Home;
