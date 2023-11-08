import React from 'react';
import { Container } from 'react-bootstrap';
import TournamentCard from '../components/TournamentCard';
import '../styles/page-style/Home.css';

function Home() {


  return (
    <><div className='main'>


      <div class="lefttext">
        <div class="textwrap">
          <p>Pojďte si zahrát fotbalový turnaj! Přihlaste se a zúčastněte se s vaším týmem a ukážete své dovednosti na trávě. </p>
          <button>Procházet</button>
          <button>Vytvořit</button>

        </div>
      </div>
      <div class="rightimage">
        <img src="https://www.ixpaper.com/wp-content/uploads/2021/06/lionel-messi-hd-wallpaper-ixpaper.jpg" />
      </div>
    </div><Container>



        <h3>Všechny turnaje:</h3>
        <TournamentCard />
        <TournamentCard />
        <TournamentCard />
        <TournamentCard />
        <TournamentCard />
      </Container></>
  );
};

export default Home;
