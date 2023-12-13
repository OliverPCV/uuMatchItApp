import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  private invalidatedTokens: string[] = [];
  constructor(private usersService: UsersService, private jwtService: JwtService) {
    this.usersService = usersService;
    this.jwtService = jwtService;
  }

  /**
   * @param username - the username of the user
   * @param pass - plaintext password of the user
   *
   * function hashes the password and compares it to the database using bcrypt
   * if the password is correct, return the user encoded in a jwt token, only username id
   * said fckit async is on
   * */
  async signIn(username: string, pass: string) {
    const user = this.usersService.findUser(username);
    let hash = bcrypt.hashSync(pass, 10);

    if (user == null) {
      throw new UnauthorizedException();
    }

    if (bcrypt.compareSync(hash, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, username: user.username };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async logOut(token: string) {
    this.invalidatedTokens.push(token);
  }

  isTokenInvalid(token: string) {
    return this.invalidatedTokens.includes(token);
  }
}
