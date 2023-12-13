import { Injectable } from '@nestjs/common';
import { Tournament } from '../Interfaces/Tournament';

@Injectable()
export class TournamentService {

      createTournament(id: string, tournament: {
          name: string,
          prize: string,
          date: Date,
          place: string,
          type: string
      }) {
        //implement the method so it connects to the database using orm and creates the entry in the tournament table





      }

      getTournaments() {
          throw new Error("Method not implemented.");
      }


  getTournamentDetail(id: string) {
    throw new Error("Method not implemented.");
  }

  editTournament(id: string, tournament: Tournament) {
    
  }
}
