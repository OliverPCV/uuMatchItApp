import { BadRequestException, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
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
   * @param state
   *
   * */
  @Put(":inviteId")
  @UseGuards(AuthGuard)
  async handleInvitation(@Req() request: AuthRequest, @Param('inviteId') inviteId: number, @Query('state') state: InviteState) {
    return this.inviteService.handleInvitation(inviteId, state, request.user.id);
  }


  /**
   * Invite a user to a team
   * @param request
   * @param teamId id of the team
   * @param username username of the user to be invited
   * TODO add a person that is inviting
   * */
  @UseGuards(AuthGuard)
  @Post()
  async inviteToTeam(@Req() request: AuthRequest, @Query("teamId") teamId: number, @Query("user") username: string) {
    const team = await this.teamService.getTeam(teamId);
    if (!team) {
      throw new BadRequestException("Team does not exist");
    }
    console.log(team);
    if (team.owner.id !== request.user.id) {
      throw new BadRequestException("You are not the owner of the team");
    }

    await this.inviteService.inviteUserToTeam(teamId, username).then(() => {
      return "User invited";
    }, (err: BadRequestException) => {
      throw err;
      }
    )
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
