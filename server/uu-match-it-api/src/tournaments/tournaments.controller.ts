import { Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
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
  createTournament(@Req() request: AuthRequest, tournament: Tournament) {
    if (!tournament.name || !tournament.prize || !tournament.date || !tournament.place || !tournament.type) {
      throw new Error('Missing parameters');
    }
    const user = request.user;
    this.worker.createTournament(tournament).then(() => {
      return { message: 'Tournament created' };
    });

  }

  @Get()
  @UseGuards(AuthGuard)
  getTournaments() {
    return this.worker.getTournaments();
  }


  @Get(':id')
  @UseGuards(AuthGuard)
  getTournamentDetail(id: number) {
    return this.worker.getTournamentDetail(id);
  }

  @Put()
  @UseGuards(AuthGuard)
  editTournament(id: string, tournament: Tournament) {
    if (!tournament.name || !tournament.date || !tournament.place || !tournament.type) {
      throw new Error('Missing parameters');
    }

    return this.worker.editTournament(id, tournament);
  }

  createMatches(id: string) {
    throw new Error('Method not implemented.');
  }


}
