import { Controller, Get, Post, Put } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteState } from '../Interfaces/Invite';

@Controller('invites')
export class InvitesController {


  constructor(private inviteService: InviteService) {
  }

  /**
   * sets the invitation status, either accepted or declined
   * @param inviteId
   * @param status
   *
   * */
  @Put()
  async handleInvitation(inviteId: number, status: InviteState) {
    return this.inviteService.handleInvitation(inviteId, status);
  }

  @Post()
  async inviteUserToTeam(teamId: string, userId: string) {
    return this.inviteService.inviteUserToTeam(teamId, userId);
  }


  /**
   * Lists all active invitations for the user
   *
   * @header user token, to identify the user and his roles
   * */
  @Get()
  showInvitations() {
  }


}
