import * as React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/component-style/TournamentCard.css";
import { Button } from 'react-bootstrap';

export default function TournamentCard({ data }) {

  const navigate = useNavigate();

  const goToTeamDetail = () => {
    navigate(`/teamdetail/${data.id}`);
  };

  return ( 
    <div class="card">
    <img src="https://www.saturdayfootball.org/uploads/2/9/9/8/2998227/team-kh_orig.jpg" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{data.name}</h5>
      <Button variant="outline-success" onClick={goToTeamDetail}>Detail</Button>

    </div>
  </div>
    );
}