import { BadRequestException, Injectable } from '@nestjs/common';
import { Tournament } from '../Interfaces/Tournament';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Interfaces/User';
import { Team } from '../Interfaces/Team';

@Injectable()
export class TournamentService {

  constructor(
    @InjectRepository(Tournament) private tournamentRep: Repository<Tournament>,
    @InjectRepository(Team) private teamRep: Repository<Team>
  ) {
  }

  async createTournament(tournament: Tournament, ownerId: number) {
    tournament.owner = { id: ownerId } as User;
    return this.tournamentRep.insert(tournament);
  }

  async getTournaments() {
    return this.tournamentRep.find();
  }

  async getTournamentDetail(id: number) {
    return this.tournamentRep.findOne({
      where: { id: id },
      relations: ['owner', 'teams'],
    });
  }

  async editTournament(id: number, tournament: Tournament, callerId: number) {
    const tournamentToEdit = await this.tournamentRep.findOne({
      where: { id: id }, relations: ['owner'],
    });
    if (!tournamentToEdit) {
      throw new BadRequestException('Tournament does not exist');
    }

    if (tournamentToEdit.owner.id !== callerId) {
      throw new BadRequestException('User is not the owner of the tournament');
    }
    return this.tournamentRep.update(id, tournament);
  }

  async deleteTournament(tournamentId: number, callerId: number) {
    const tournament = await this.tournamentRep.findOne({
      where: { id: tournamentId, owner: { id: callerId } }, relations: ['owner'],
    });
    if (tournament) {
      await this.tournamentRep.delete(tournament);
    } else {
      throw new BadRequestException('User is not the owner of the tournament');
    }
  }

  async joinTournament(tournamentId: number, teamId: number, callerId: number) {
    return this.tournamentRep.findOne({
      where: {id: tournamentId}, relations: ['teams']
    }).then( async (tournament) => {
      if (!tournament) {
        throw new BadRequestException('Tournament does not exist');
      }

      let team = await this.teamRep.findOne({
        where: { id: teamId }, relations: ['owner']
      });

      if (!team) {
        throw new BadRequestException('Team does not exist');
      }

      if (team.owner.id !== callerId) {
        throw new BadRequestException('Insufficient permissions');
      }

      tournament.teams.push({ id: teamId } as Team);
      await this.tournamentRep.save(tournament);
      return { message: 'Team added to tournament' };
    });
  }

  async leaveTournament(tournamentId: number, teamId: number, callerId: number) {
    return this.tournamentRep.findOne({
      where: {id: tournamentId}, relations: ['owner', 'teams']
    }).then(async (tournament) => {
      if (!tournament) {
        throw new BadRequestException('Tournament does not exist');
      }
      let team = await this.teamRep.findOne({
        where: { id: teamId }, relations: ['owner']
      });
      if (!team || !tournament.teams.find((team) => team.id === teamId)) {
        throw new BadRequestException('Team does not exist');
      }

      if (tournament.owner.id !== callerId || team.owner.id !== callerId) {
        throw new BadRequestException('Insufficient permissions');
      }
      tournament.teams = tournament.teams.filter((team) => team.id !== teamId);
      await this.tournamentRep.save(tournament);
      return {message: 'Team removed from tournament'};
    });
  }
}
