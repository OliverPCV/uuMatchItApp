import { Controller } from '@nestjs/common';
import { Tournament } from '../Interfaces/Tournament';


@Controller('tournaments')
export class TournamentsController {


    createTournament(tournament: Tournament) {
        throw new Error("Method not implemented.");
    }

    getTournaments() {
        throw new Error("Method not implemented.");
    }


    getTournamentDetail(id: string) {

    }

    editTournament(id: string, tournament: Tournament) {
        throw new Error("Method not implemented.");
    }

    createMatches(id: string) {
        throw new Error("Method not implemented.");
    }



}
