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
import { Tournament } from '../Interfaces/Tournament';
import { AuthGuard } from '../auth/auth.guard';
import { AuthRequest } from '../Interfaces/AuthRequest';
import { TournamentService } from './tournament.service';
import { Match } from '../Interfaces/Match';


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
    if (tournament.sizeLimit !== 4 && tournament.sizeLimit !== 8) {
      throw new BadRequestException('Wrong size limit');
    }

    return this.worker.createTournament(tournament, request.user.id).then((result) => {
      return result.identifiers[0];
    }, (e: BadRequestException) => {
      throw e;
    });
  }

  @Get()
  getTournaments() {
    return this.worker.getTournaments();
  }

  @Get('mine')
  @UseGuards(AuthGuard)
  getTournamentsByUser(@Req() request: AuthRequest) {
    return this.worker.getTournamentsByUser(request.user.id);
  }

  @Get(':id')
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
    return this.worker.deleteTournament(id, request.user.id).then(() => {
      return { message: 'Tournament deleted' };
    }, (e: BadRequestException) => {
      throw e;
    });
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

  @Post(':id/start')
  @UseGuards(AuthGuard)
  async startTournament(
    @Req() request: AuthRequest,
    @Param('id', ParseIntPipe) tournamentId: number,
  ) {
    return this.worker.startTournament(tournamentId, request.user.id).then((updateResult) => {
      return { message: 'Tournament started', data: updateResult };
    }, (e: BadRequestException) => {
      throw e;
    });
  }

  // we also need the score so it can be displayed in the tournament
  @Post(':tournamentId')
  @UseGuards(AuthGuard)
  async updateMatch(
    @Req() request: AuthRequest,
    @Param('tournamentId', ParseIntPipe) tournamentId: number,
    @Body() match: Match
  ) {
    return this.worker.editMatch(tournamentId, match, request.user.id).then(() => {
      return { message: 'Match edit successful' };
    }, (e: BadRequestException) => {
      throw e;
    });
  }
}
