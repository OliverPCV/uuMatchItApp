import { Injectable } from '@nestjs/common';
import { Team } from '../Interfaces/Team';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TeamsService {
  constructor(@InjectRepository(Team) private teamRep: Repository<Team>) {
  }

  getTeam(id: number) {
    return this.teamRep.findOneBy({ id: id });
  }

  async createTeam(team: Team) {
    return this.teamRep.save(team);
  }

  getTeams() {
    return this.teamRep.find();
  }
}
