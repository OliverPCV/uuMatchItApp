import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { TeamsController } from './teams/teams.controller';
import { TournamentsController } from './tournaments/tournaments.controller';
import { UsersService } from './users/users.service';
import { TeamsService } from './teams/teams.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthGuard} from "./auth/auth.guard";
import {JwtModule} from "@nestjs/jwt";
import { AuthService } from './auth/auth.service';
import { TournamentService } from './tournaments/tournament.service';
import { User } from './Interfaces/User';
import { Team } from './Interfaces/Team';
import { Tournament } from './Interfaces/Tournament';
import { Invite } from './Interfaces/Invite';
import { InvitesController } from './invites/invites.controller';
import { InviteService } from './invites/invite.service';
import { Match, MatchParticipant } from './Interfaces/Match';
const jwtSecret = 'VerySecretKey';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Tournament, Team, Invite, Match, MatchParticipant]),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'matchit.database.windows.net',
      port: 1433,
      username: 'matchitadmin',
      password: 'Kokos123',
      database: 'uumatchit',
      entities: [User, Tournament, Team, Invite, Match, MatchParticipant],
      //synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: '60m' },
    })
  ],
  controllers: [AppController, UsersController, TeamsController, TournamentsController, InvitesController],
  providers: [AppService, AuthGuard, TeamsService, UsersService, InviteService, AuthService, TournamentService],
})
export class AppModule {}
