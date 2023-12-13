import { Injectable } from '@nestjs/common';
import { Team } from '../Interfaces/Team';

@Injectable()
export class TeamsService {


  constructor() {
  }

  private teams: Team[] = [
    {
      id: 1,
      name: "FC Postižín",
      ownerId: 1,
      players: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    {
      id: 2,
      name: "SK Úvaly",
      ownerId: 1,
      players: [10, 11, 12, 13, 14, 15, 16, 17, 18],
    },
    {
      id: 3,
      name: "FC NEKOPNEMSI",
      ownerId: 2,
      players: [10, 11, 12, 13, 14, 15, 16, 17, 18],
    },
  ]

  private idCounter: number = 3;



  getTeam(id: string) {
    return this.teams.find(team => team.id == parseInt(id));
  }

  createTeam(id: string, name: string) {
    this.teams.push({
      id: ++this.idCounter,
      name: name,
      ownerId: parseInt(id),
      players: [],
    })
  }

  getTeams() {
    return this.teams;
  }

  inviteUserToTeam(id: string, teamId: string, userId: string) {

  }
}
