import { Injectable } from '@nestjs/common';
import { Invite } from '../Interfaces/Invite';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InviteService {

  constructor(
    @InjectRepository(Invite) private inviteRep: Repository<Invite>,
  ) {}

  async inviteUserToTeam(teamId: string, userId: string) {
    let invite = new Invite(teamId, userId)
    await this.inviteRep.save(invite);
  }

  async handleInvitation(invitationId: number, state: any) {
    let invite = await this.inviteRep.findOneBy({id: invitationId});
    invite.state = state;
    await this.inviteRep.update(invitationId, invite);
  }

  async getInvitations(userId: string) {
    return await this.inviteRep.findBy({userId: userId});
  }

}
