import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import $ from 'jquery'; // Nezapomeňte nainstalovat jQuery do vašeho projektu
import '../styles/page-style/TeamCreate.css'; // Aktualizujte cestu k CSS podle potřeby

function CreateTeam() {
  const [teamData, setTeamData] = useState({
    name: '',
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(teamData);
    // Přidejte logiku odeslání formuláře
  };

  return (
    <form action="" className='createform'>
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
