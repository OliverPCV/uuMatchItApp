import {CanActivate, ExecutionContext, Injectable, UnauthorizedException,} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';
import {UsersService} from "../users/users.service";
import * as bcrypt from "bcrypt";


/**
 * Usage:
 * import { AuthGuard } from './auth.guard';
 * @UseGuards(AuthGuard)
 * @AnyHttpMethod()
 * yourMethod(@Request() req <-- Very fucking important, otherwise the auth guard does not WORK) {
 *  //code here
 * }
 * */
@Injectable()
export class AuthGuard implements CanActivate {
    private readonly jwtSecret = 'VerySecretKey';
    private readonly iterations = 10;

    constructor(
        private jwtService: JwtService,
        private usersService: UsersService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = await this.jwtService.verifyAsync(
                token,
                {
                    secret: this.jwtSecret
                }
            );
        } catch {
            throw new UnauthorizedException();
        }
        return true;
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
        console.log(pass)
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

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
