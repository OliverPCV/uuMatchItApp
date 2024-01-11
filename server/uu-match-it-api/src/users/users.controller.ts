import { BadRequestException, Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import {Response} from '../Interfaces/Response';
import {UsersService} from "./users.service";
import { AuthService } from '../auth/auth.service';
import { User } from '../Interfaces/User';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService, private auth: AuthService) {
        this.userService = userService;
        this.auth = auth;
    }


    @Post("/register")
    async createUser(@Body() user: User): Promise<string> {
        if (!user) {
            throw new BadRequestException();
        }
        if (user.username == null || user.password == null || user.email == null) {
            throw new BadRequestException();
        } else {
           return this.userService.createUser(user).then(() => {
               return "User created";
           }, (err: BadRequestException) => {
                throw err;
           });
        }
    }

    @Post("/login")
    async login(@Body() user: {username: string, password: string}): Promise<{ token: string } | null> {
        if (!user) {
            throw new BadRequestException();
        }

        if (!user.username || !user.password) {
            throw new BadRequestException();
        }
        let token = await this.auth.signIn(user.username, user.password);
        if (token) {
            return token ;
        } else {
            throw new UnauthorizedException();
        }
    }

    /**
     * Logs the user out, destroying his token form the users service
     * */
    logout() {
        throw new Error("Method not implemented.");
    }

}
