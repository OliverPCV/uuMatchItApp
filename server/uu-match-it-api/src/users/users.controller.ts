import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Post,
    Req,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import {UsersService} from "./users.service";
import { AuthService } from '../auth/auth.service';
import { User } from '../Interfaces/User';
import { AuthGuard } from '../auth/auth.guard';
import { AuthRequest } from '../Interfaces/AuthRequest';

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

    @Get('/me')
    @UseGuards(AuthGuard)
    async getLoggedUser(@Req() request: AuthRequest) {
        return this.userService.findUserById(request.user.id);
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


}
