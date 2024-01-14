import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { createTeam } from '../services/teamService';
import $ from 'jquery'; // Nezapomeňte nainstalovat jQuery do vašeho projektu
import '../styles/page-style/TeamCreate.css'; // Aktualizujte cestu k CSS podle potřeby
import { useNavigate } from 'react-router-dom';

function CreateTeam() {
  const [teamData, setTeamData] = useState({
    name: '',
    players: []
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
    setTeamData({ ...teamData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseData = await createTeam(teamData);
      console.log('Team created successfully:', responseData);
      navigate('/myteams');
    } catch (error) {
      console.error('Error while creating team:', error);
    }
  };

  return (
    <form className='createform' onSubmit={handleSubmit}>
      <div className="form-group">
        <h2 className="heading">Vytvořit tým</h2>
        <div className="controls">
          <input 
            type="text" 
            id="name" 
            className="floatLabel" 
            name="name" 
            value={teamData.name} 
            onChange={handleChange} 
          />
          <label htmlFor="name">Název</label>
        </div>
      </div>
  
      <div className="form-group">
        <div className="grid">
          <button type="submit" value="Submit" className="col-1-4">Odeslat</button> 
        </div>
      </div>
    </form>
  );
  
}

export default CreateTeam;
