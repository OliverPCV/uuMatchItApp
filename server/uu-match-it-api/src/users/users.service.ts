import { Injectable } from '@nestjs/common';
import { User } from '../Interfaces/User';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invite } from '../Interfaces/Invite';


@Injectable()
export class UsersService {


  constructor(
    @InjectRepository(User) private userRep: Repository<User>,
    @InjectRepository(Invite) private inviteRep: Repository<Invite>,
  ) {
  }

  findUser(username: string): Promise<User | null> {
    return this.userRep.findOneBy({ username: username });
  }
  getUsers(): Promise<User[]> {
    return this.userRep.find();
  }
  async createUser(user: User): Promise<Boolean> {
    try {
      let value = await this.findUser(user.username);
      let isUsernameTaken: boolean = !value;
      if (isUsernameTaken) {
        return false;
      }
      user.password = bcrypt.hashSync(user.password, 10);
      await this.userRep.save(user);
      return true;
    } catch (e) {
      return false;
    }
  }

  async inviteUserToTeam(teamId: string, userId: string) {
    let invite = new Invite(teamId, userId)
    await this.inviteRep.save(invite);
  }

}
