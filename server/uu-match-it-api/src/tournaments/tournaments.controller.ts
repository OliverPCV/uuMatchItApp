import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException, NotImplementedException,
  Param,
  ParseIntPipe,
  Post,
  Put, Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Tournament } from '../Interfaces/Tournament';
import { AuthGuard } from '../auth/auth.guard';
import { AuthRequest } from '../Interfaces/AuthRequest';
import { TournamentService } from './tournament.service';


@Controller('tournaments')
export class TournamentsController {

  constructor(private worker: TournamentService) {
    this.worker = worker;
  }

  @Post()
  @UseGuards(AuthGuard)
  async createTournament(@Req() request: AuthRequest, @Body() tournament: Tournament) {
    if (!tournament.name || !tournament.prize || !tournament.date || !tournament.place || !tournament.type) {
      throw new BadRequestException('Missing parameters');
    }

    return this.worker.createTournament(tournament, request.user.id).then((result) => {
      return result.identifiers[0];
    }, (e: BadRequestException) => {
      throw e;
    });
  }

  @Get()
  @UseGuards(AuthGuard)
  getTournaments() {
    return this.worker.getTournaments();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getTournamentDetail(@Param('id', ParseIntPipe) id: number) {
    const tournament = await this.worker.getTournamentDetail(id);
    if (tournament) {
      return tournament;
    }
    throw new NotFoundException('Tournament not found');
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async editTournament(
    @Req() request: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() tournament: Tournament,
  ) {
    return this.worker.editTournament(id, tournament, request.user.id).then(() => {
      return { message: 'Tournament edited' };
    }, (e: BadRequestException) => {
      throw e;
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteTournament(
    @Req() request: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return  this.worker.deleteTournament(id, request.user.id).then(() => {
      return { message: 'Tournament deleted' };
    }, (e: BadRequestException) => {
      throw e;
    });
  }

  createMatches(id: string) {
    throw new NotImplementedException('Method not implemented.');
  }

  @Post(':id/join')
  @UseGuards(AuthGuard)
  async joinTournament(
    @Req() request: AuthRequest,
    @Param('id', ParseIntPipe) tournamentId: number,
    @Query('teamId', ParseIntPipe) teamId: number,
  ) {
    return this.worker.joinTournament(tournamentId, teamId, request.user.id).then(() => {
      return { message: 'Team added to tournament' };
    }, (e: BadRequestException) => {
      throw e;
    });
  }

  @Post(':id/leave')
  @UseGuards(AuthGuard)
  async leaveTournament(
    @Req() request: AuthRequest,
    @Param('id', ParseIntPipe) tournamentId: number,
    @Query('teamId', ParseIntPipe) teamId: number,
  ) {
    return this.worker.leaveTournament(tournamentId, teamId, request.user.id).then(() => {
      return { message: 'Team removed from tournament' };
    }, (e: BadRequestException) => {
      throw e;
    });
  }
}
