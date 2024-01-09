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
const jwtSecret = 'VerySecretKey';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'uumatchit',
      entities: [User, Tournament, Team],
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: '60m' },
    })
  ],
  controllers: [AppController, UsersController, TeamsController, TournamentsController],
  providers: [AppService, UsersService, AuthGuard,TeamsService, AuthService, TournamentService],
})
export class AppModule {}
