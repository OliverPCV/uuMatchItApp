import { Injectable } from '@nestjs/common';
import { Tournament } from '../Interfaces/Tournament';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TournamentService {


  constructor(@InjectRepository(Tournament) private tournamentRep: Repository<Tournament>) {
  }

  async createTournament(tournament: Tournament) {
    await this.tournamentRep.save(tournament);
  }

   async getTournaments() {
    return this.tournamentRep.find();
  }

  async getTournamentDetail(id: number) {
    return this.tournamentRep.findOneBy({ id: id });
  }
  async editTournament(id: string, tournament: Tournament) {
    return this.tournamentRep.update(id, tournament);
  }
}
