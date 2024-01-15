import { BadRequestException, Injectable, NotImplementedException } from '@nestjs/common';
import { Tournament } from '../Interfaces/Tournament';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Interfaces/User';
import { Team } from '../Interfaces/Team';

@Injectable()
export class TournamentService {

  constructor(
    @InjectRepository(Tournament) private tournamentRep: Repository<Tournament>,
    @InjectRepository(Team) private teamRep: Repository<Team>,
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

  async startTournament(tournamentId: number, id: number) {
    return this.tournamentRep.findOne({
        where: { id: tournamentId },
        relations: ['owner', 'teams'],
      },
    ).then((tournament) => {
      if (!tournament) {
        throw new BadRequestException('Tournament does not exist');
      }
      if (tournament.owner.id !== id) {
        throw new BadRequestException('User is not the owner of the tournament');
      }
      if (tournament.teams.length < 2) {
        throw new BadRequestException('Not enough teams in tournament');
      }
      console.dir(tournament, { depth: null });
      tournament = this.createMatches(tournament);
      console.dir(tournament, { depth: null });

      return this.tournamentRep.save(tournament);
    });
  }

  async setMatchWinner(tournamentId: number, matchId: number, teamId: number, score: number[], id: number) {






    throw new NotImplementedException('Method not implemented.');
  }


  createMatches(tournament: Tournament) {
    console.log('create matches');
    console.log(tournament);
    let teams = tournament.teams;
    let matches = [];
    //scramble the teams array
    teams = this.shuffle(teams);

    //create the matches
    //start time should be approx 14 days from now on
    for (let i = 0; i < teams.length; i += 2) {
      let match = {
        tournament: {id: tournament.id} as Tournament,
        tournamentRoundText: '1',
        startTime: new Date(Date.now() + 12096e5),
        state: 'SCHEDULED',
        matchParticipants: [
          {
            team: teams[i],
            resultText: '',
            status: null,
          },
          {
            team: teams[i + 1],
            resultText: '',
            status: null,
          }
        ]
      };
      matches.push(match);
    }

    tournament.matches = matches;
    return tournament;
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
