import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { TeamsController } from './teams/teams.controller';
import { TournamentsController } from './tournaments/tournaments.controller';
import { UsersService } from './users/users.service';
import { TeamsService } from './teams/teams.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {AuthGuard} from "./auth/auth.guard";
import {JwtModule} from "@nestjs/jwt";
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
      entities: [User],
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: '60m' },
    })
  ],
  controllers: [AppController, UsersController, TeamsController, TournamentsController],
  providers: [AppService, UsersService, TeamsService, AuthGuard],
})
export class AppModule {}
