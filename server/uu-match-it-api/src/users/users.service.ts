import { Injectable } from '@nestjs/common';
import { User } from '../Interfaces/User';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {


  constructor(
    @InjectRepository(User) private userRep: Repository<User>
  ) {
  }

  findUser(username: string): Promise<User | null> {
    return this.userRep.findOneBy({ username: username });
  }

  //TODO delete this as it is used for testing
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

}
