import React, { useState, useEffect } from 'react';
import { createTournament } from '../services/tourService';
import $ from 'jquery'; // Make sure to install jQuery in your project
import '../styles/page-style/TournamentCreate.css';
import { useNavigate } from 'react-router-dom';

function CreateTournament() {
  const [tournamentData, setTournamentData] = useState({
    name: '',
    date: '',
    place: '',
    prize: '',
    type: '',
    sizeLimit: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    function floatLabel(inputType) {
      $(inputType).each(function () {
        const $this = $(this);
        $this.focus(function () {
          $this.next().addClass('active');
        });
        $this.blur(function () {
          if ($this.val() === '' || $this.val() === 'blank') {
            $this.next().removeClass();
          }
        });
      });
    }
    floatLabel('.floatLabel');
  }, []);

  const handleChange = (e) => {
    const value = e.target.name === 'sizeLimit' ? parseInt(e.target.value) : e.target.value;
    setTournamentData({ ...tournamentData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseData = await createTournament(tournamentData);
      console.log('Tournament created successfully:', responseData);
      navigate('/mytournaments');
    } catch (error) {
      console.error('Error while creating tournament:', error);
    }
  };

  return (
    <form className='createform' onSubmit={handleSubmit}>
      <div className="form-group">
        <h2 className="heading">Vytvořit turnaj</h2>
        <div className="controls">
          <input type="text" id="name" className="floatLabel" name="name" onChange={handleChange} />
          <label htmlFor="name">Jméno</label>
        </div>
        <div className="controls">
          <input type="text" id="place" className="floatLabel" name="place" onChange={handleChange} />
          <label htmlFor="place">Místo</label>
        </div>
        <div className="controls">
          <input type="datetime-local" id="date" className="floatLabel" name="date" onChange={handleChange} />
          <label htmlFor="date">Datum a čas</label>
        </div>
        <div className="controls">
          <input type="text" id="prize" className="floatLabel" name="prize" onChange={handleChange} />
          <label htmlFor="prize">Cena</label>
        </div>
        <div className="controls">
          <select id="type" className="floatLabel" name="type" onChange={handleChange}>
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
        <div className="controls">
          <select id="sizeLimit" className="floatLabel" name="sizeLimit" onChange={handleChange}>
            <option value="">Vyberte limit velikosti</option>
            <option value="4">4</option>
            <option value="8">8</option>
          </select>
          <label htmlFor="sizeLimit">Limit velikosti</label>
        </div>
        <div className="grid">
          <button type="submit" value="Submit" className="col-1-4">Odeslat</button>
        </div>
      </div>
    </form>
  );
}

export default CreateTournament;
