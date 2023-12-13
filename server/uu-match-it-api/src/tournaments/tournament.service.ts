import { Injectable } from '@nestjs/common';
import { Tournament } from '../Interfaces/Tournament';

@Injectable()
export class TournamentService {

  private tournaments: Tournament[] = [
    {
      id: 1,
      name: "Sobotní fóčo",
      ownerId: 1,
      type: "5V5",
      teams: [1, 2, 3, 4, 5, 6],
      isFinished: false,
      date: new Date("2023-11-18"),
      place: "Úvaly",
      prize: 5000,
    },
    {
      id: 2,
      name: "Chodovské derby",
      ownerId: 2,
      type: "5V5",
      teams: [6, 7, 8, 9],
      isFinished: false,
      date: new Date("2023-3-22"),
      place: "Westfield Chodov",
      prize: 10000,
    },
    {
      id: 3,
      name: "4fun fóčo",
      ownerId: 1,
      type: "5V5",
      teams: [1, 2, 3, 4, 5],
      isFinished: true,
      date: new Date("2023-11-30"),
      place: "Black Bridge",
      prize: 7000,
    },
    {
      id: 4,
      name: "Derby Sražských S",
      ownerId: 4,
      type: "11V11",
      teams: [1, 2],
      isFinished: true,
      date: new Date("2023-12-24"),
      place: "Eden",
      prize: 50000,
    },
  ];

  private idCounter = 5;
  createTournament(id: string, tournament: {
          name: string,
          prize: string,
          date: Date,
          place: string,
          type: string
      }) {
    this.tournaments.push( {
      id: this.idCounter++,
      name: tournament.name,
      ownerId: parseInt(id),
      type: tournament.type,
      teams: [],
      isFinished: false,
      date: tournament.date,
      place: tournament.place,
      prize: tournament.prize
    })

      }

      getTournaments() {
        return this.tournaments;
      }


  getTournamentDetail(id: string) {
    return this.tournaments.find(tournament => tournament.id === parseInt(id));
  }

  editTournament(id: string, tournament: Tournament) {
    const tournamentToEdit = this.tournaments.find(tournament => tournament.id === parseInt(id));
    if (!tournamentToEdit) {
      throw new Error("Tournament not found");
    }
    tournamentToEdit.name = tournament.name;
    tournamentToEdit.type = tournament.type;
    tournamentToEdit.date = tournament.date;
    tournamentToEdit.place = tournament.place;
    tournamentToEdit.prize = tournament.prize;
    return tournamentToEdit;
  }
}
