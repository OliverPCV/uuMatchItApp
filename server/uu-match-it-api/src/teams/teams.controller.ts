import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Team } from '../Interfaces/Team';
import { AuthGuard } from '../auth/auth.guard';
import { AuthRequest } from '../Interfaces/AuthRequest';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {


  constructor(private worker: TeamsService) {
    this.worker = worker;
  }

  /**
   * Allows user to create a team
   * @param request
   * @param team Team object to be created
   *
   * */
  @UseGuards(AuthGuard)
  @Post()
  createTeam(@Req() request: AuthRequest, @Body() team: Team) {
    if (team.name.length < 3) {
      throw new BadRequestException('Team name is too short');
    }

    if (team.name.length > 30) {
      throw new BadRequestException('Team name is too long');
    }

    this.worker.createTeam(team, request.user.id).then(() => {
      return 'Team created';
    });
  }

  //FIXME: This is a temporary solution to get the teams of the user
  //FIXME: Delete this when testing is finished
  @UseGuards(AuthGuard)
  @Get()
  getTeams() {
    return this.worker.getTeams();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getTeam(@Param('id', ParseIntPipe) id: number) {
    let team = await this.worker.getTeam(id);
    if (team == null) {
      throw new NotFoundException('Team not found');
    } else return team;
  }

  /**
   * TeamOwner can edit the parameters of the team like image or name
   * @param teamId id of the team
   * TODO figure out other parameters
   * */
  @UseGuards(AuthGuard)
  @Put()
  editTeam(teamId: string) {
    throw new Error('Method not implemented.');
  }

  /**
   * Deletes the team
   * @param request
   * @param teamId id of the team
   *
   * */
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteTeam(@Req() request: AuthRequest, @Param('id', ParseIntPipe) teamId: number) {
    return this.worker.deleteTeam(teamId, request.user.id);
  }

  /**
   * Removes a user from the team
   * @param request
   * @param teamId id of the team
   * @param userId id of the user to be removed
   *
   * TODO add a person that is removing for permission check
   * */
  @UseGuards(AuthGuard)
  @Delete(':teamId')
  kickFromTeam(
    @Req() request: AuthRequest,
    @Param('teamId', ParseIntPipe) teamId: number,
    @Query('userId', ParseIntPipe) userId: number
  ) {
    return this.worker.removePlayer(teamId, userId, request.user.id);
  }
}
