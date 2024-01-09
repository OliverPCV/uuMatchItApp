import { BadRequestException, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteState } from '../Interfaces/Invite';
import { AuthGuard } from '../auth/auth.guard';
import { AuthRequest } from '../Interfaces/AuthRequest';
import { TeamsService } from '../teams/teams.service';

@Controller('invites')
export class InvitesController {


  constructor(
    private inviteService: InviteService,
    private teamService: TeamsService,
  ) {
  }

  /**
   * sets the invitation status, either accepted or declined
   * @param request
   * @param inviteId
   * @param status
   *
   * */
  @Put()
  @UseGuards(AuthGuard)
  async handleInvitation(@Req() request: AuthRequest,inviteId: number, status: InviteState) {
    return this.inviteService.handleInvitation(inviteId, status);
  }


  /**
   * Invite a user to a team
   * @param request
   * @param teamId id of the team
   * @param userId id of the user to be invited
   * TODO add a person that is inviting
   * */
  @UseGuards(AuthGuard)
  @Post("invite/:teamId/:userId")
  async inviteToTeam(@Req() request: AuthRequest, @Param("teamId") teamId: number, @Param("userId") userId: number) {
    const team = await this.teamService.getTeam(teamId);

    if (team.owner.id !== request.user.id) {
      throw new BadRequestException("You are not the owner of the team");
    }

    if (userId === request.user.id) {
      throw new BadRequestException("You cannot invite yourself");
    }

    this.inviteService.inviteUserToTeam(teamId, userId).then(() => {
      return "User invited";
    })
  }


  /**
   * Lists all active invitations for the user
   *
   * @header user token, to identify the user and his roles
   * */
  @Get()
  @UseGuards(AuthGuard)
  showInvitations(@Req() request: AuthRequest) {
    return this.inviteService.getInvitations(request.user.id);
  }
}
