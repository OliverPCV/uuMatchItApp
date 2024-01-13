import { BadRequestException, Injectable } from '@nestjs/common';
import { Team } from '../Interfaces/Team';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Interfaces/User';
import { InviteService } from '../invites/invite.service';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private teamRep: Repository<Team>,
    private inviteWorker: InviteService,
  ) {
  }

  getTeam(id: number) {
    return this.teamRep.findOne({
      where: { id: id }, relations: ['owner', 'players'],
    });
  }

  async createTeam(team: Team, ownerId: number) {
    team.owner = { id: ownerId } as User;
    let players = team.players as unknown as string[];
    team.players = [];
    this.teamRep.insert(team).then((result) => {
      if (result.identifiers.length == 0) {
        throw new BadRequestException('Team could not be created');
      }

      const teamId = result.identifiers[0].id;
      for (const username of players) {
        try {
          this.inviteWorker.inviteUserToTeam(teamId, username);
        } catch (e) {
          console.log(e);
        }
      }
    });
    return;
  }

  getTeams(userId: number) {
    //find all the teams the user is either in or is the owner of
    return this.teamRep.find({
      where: [{ owner: { id: userId } }, { players: { id: userId } }], relations: ['owner', 'players'],
    });
  }

  async deleteTeam(teamId: number, userId: number) {
    await this.teamRep.findOne({
      where: { id: teamId, owner: { id: userId } }, relations: ['owner'],
    }).then((team) => {
      if (team) {
        this.teamRep.delete(team);
      } else {
        throw new BadRequestException('User is not the owner of the team');
      }
    });
  }

  async removePlayer(teamId: number, userId: number, callerId: number) {
    const team = await this.teamRep.findOne({
      where: { id: teamId }, relations: ['owner', 'players'],
    });
    if (team.owner.id == callerId || userId == callerId) {
      team.players = team.players.filter((player) => player.id != userId);
      await this.teamRep.save(team);
    } else {
      throw new BadRequestException('User is not the owner of the team');
    }
  }
}
