import { BadRequestException, Injectable, NotImplementedException } from '@nestjs/common';
import { Tournament } from '../Interfaces/Tournament';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Interfaces/User';
import { Team } from '../Interfaces/Team';
import { Match } from '../Interfaces/Match';

@Injectable()
export class TournamentService {

  constructor(
    @InjectRepository(Tournament) private tournamentRep: Repository<Tournament>,
    @InjectRepository(Team) private teamRep: Repository<Team>,
    @InjectRepository(Match) private matchRep: Repository<Match>,
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
      relations: ['owner', 'teams', 'teams.owner', 'matches', 'matches.matchParticipants'],
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
      where: { id: tournamentId }, relations: ['teams'],
    }).then(async (tournament) => {
      if (!tournament) {
        throw new BadRequestException('Tournament does not exist');
      }

      let team = await this.teamRep.findOne({
        where: { id: teamId }, relations: ['owner'],
      });

      if (!team) {
        throw new BadRequestException('Team does not exist');
      }

      if (team.owner.id !== callerId) {
        throw new BadRequestException('Insufficient permissions');
      }

      if (tournament.teams.find((team) => team.id === teamId)) {
        throw new BadRequestException('Team already in tournament');
      }

      tournament.teams.push({ id: teamId } as Team);
      await this.tournamentRep.save(tournament);
      return { message: 'Team added to tournament' };
    });
  }

  async leaveTournament(tournamentId: number, teamId: number, callerId: number) {
    return this.tournamentRep.findOne({
      where: { id: tournamentId }, relations: ['owner', 'teams'],
    }).then(async (tournament) => {
      if (!tournament) {
        throw new BadRequestException('Tournament does not exist');
      }
      let team = await this.teamRep.findOne({
        where: { id: teamId }, relations: ['owner'],
      });
      if (!team || !tournament.teams.find((team) => team.id === teamId)) {
        throw new BadRequestException('Team does not exist');
      }

      if (tournament.owner.id !== callerId && team.owner.id !== callerId) {
        throw new BadRequestException('Insufficient permissions, tournamentOwner:' + tournament.owner.id + ' teamOwner:' + team.owner.id + ' caller:' + callerId);

      }

      tournament.teams = tournament.teams.filter((team) => team.id !== teamId);
      await this.tournamentRep.save(tournament);
      return { message: 'Team removed from tournament' };
    });
  }

  getTournamentsByUser(id: number) {
    return this.tournamentRep.find({
      where: { owner: { id: id } },
      relations: ['owner'],
    });
  }

  async startTournament(tournamentId: number, callerId: number) {
    return this.tournamentRep.findOne({
        where: { id: tournamentId },
        relations: ['owner', 'teams', 'matches'],
      },
    ).then(async (tournament) => {
      if (!tournament) {
        throw new BadRequestException('Tournament does not exist');
      }
      if (tournament.owner.id !== callerId) {
        throw new BadRequestException('User is not the owner of the tournament');
      }
      if (tournament.matches.length > 0) {
        throw new BadRequestException('Tournament already started');
      }
      if (tournament.teams.length < 2) {
        throw new BadRequestException('Not enough teams in tournament');
      }


      let teams = this.shuffle(tournament.teams);
      let roundsNeeded = Math.ceil(Math.log2(teams.length));
      await this.createMatches(tournament, teams, Math.pow(2, roundsNeeded), roundsNeeded, 1, null, new Date());
      return this.tournamentRep.findOne({
        where: { id: tournamentId },
        relations: ['teams', 'matches', 'matches.matchParticipants', 'matches.matchParticipants.team'],
      }).then((tournament) => {
        tournament.matches.forEach((match) => {
          match.matchParticipants = match.matchParticipants.map((mp) => ({
            ...mp, name: mp.team.name,
          }));
        });
        return tournament;
      });
    });
  }

  async setMatchWinner(tournamentId: number, matchId: number, teamId: number, score: number[], id: number) {
    throw new NotImplementedException('Method not implemented.');
  }


  //recursively create a reverse tree of matches, as the root is the final match. The leaves are the first round matches
  //all matches have a reference to the next match, except the final match, where the next match is null
  //the tree should be built upon the nextMatch attribute
  async createMatches(tournament: Tournament, teams: Team[], totalTeams: number, round: number, matchOrder: number, refMatch: Match | null, startDate: Date | null) {
    if (round > 1)
      await this.matchRep.save(
        new Match(
          'Round ' + round + ', Match ' + matchOrder,
          round.toString(),
          startDate,
          tournament,
          [undefined, undefined],
          refMatch),
      ).then(async (match) => {
        await this.createMatches(tournament, teams, totalTeams, round - 1, matchOrder, match, startDate);
        await this.createMatches(tournament, teams, totalTeams, round - 1, matchOrder + 1, match, startDate);
      });
    else {
      let canHoard = teams.length >= totalTeams / 2;
      await this.matchRep.save(
        new Match(
          'Round ' + round + ', Match ' + matchOrder,
          round.toString(),
          startDate,
          tournament,
          [teams.pop(), canHoard ? teams.pop() : undefined],
          refMatch),
      );
    }

  }


  shuffle(array: any[]) {
    let currentIndex: number = array.length, temporaryValue: number, randomIndex: number;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}
