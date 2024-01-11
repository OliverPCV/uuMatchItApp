import { BadRequestException, Injectable } from '@nestjs/common';
import { Invite, InviteState } from '../Interfaces/Invite';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../Interfaces/Team';
import { UsersService } from '../users/users.service';
import { User } from '../Interfaces/User';

@Injectable()
export class InviteService {

  constructor(
    @InjectRepository(Invite) private inviteRep: Repository<Invite>,
    @InjectRepository(Team) private teamRep: Repository<Team>,
    @InjectRepository(User) private userRep: Repository<User>,
    private userService: UsersService
  ) {}

  async inviteUserToTeam(teamId: number, username: string) {
    return this.userRep.findOneBy({username: username}).then((user) => {
        if (!user) {
          throw new BadRequestException("User does not exist");
        }
        this.inviteRep.insert(new Invite(teamId, user.id));
    })
  }

  async handleInvitation(invitationId: number, state: InviteState, userId: number) {

    let invite = await this.inviteRep.findOne({
      where: {id: invitationId},
      relations: ['team']
    });
    if (!invite) {
      throw new BadRequestException("Invite does not exist");
    }

    if (invite.userId !== userId) {
      throw new BadRequestException("You are not the invited user");
    }

    if (invite.state !== InviteState.PENDING) {
      throw new BadRequestException("Invite has already been handled");
    }

    invite.state = state;
    if (state === InviteState.ACCEPTED) {
      console.log(invite);
      let teamPromise = this.teamRep.findOne(
        {
          where: { id: invite.team.id },
          relations: ['players'],
        });

      let userPromise = this.userService.findUserById(invite.userId);
      Promise.all([teamPromise, userPromise]).then( async ([team, user]) => {
        team.players.push(user);
        return this.teamRep.save(team).then(()  => {
          return this.inviteRep.update(invitationId, invite);
        });
      });
    } else if (state === InviteState.DECLINED) {
       await this.inviteRep.update(invitationId, invite);
    }
  }

  async getInvitations(userId: number) {
    //TODO get only PENDING ones, we dont need the rest.
    //keeping the rest for now for testing purposes
    return await this.inviteRep.find({
      where: {userId: userId},
      relations: ['team'],
    });
  }

}
