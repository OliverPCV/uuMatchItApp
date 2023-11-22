import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { TeamsController } from './teams/teams.controller';
import { TournamentsController } from './tournaments/tournaments.controller';
import { UsersService } from './users/users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'uumatchit',
      entities: [User],
      synchronize: true,
    })
  ],
  controllers: [AppController, UsersController, TeamsController, TournamentsController],
  providers: [AppService, UsersService],
})
export class AppModule {}
