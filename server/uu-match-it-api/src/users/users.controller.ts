import {Body, Controller, Post} from '@nestjs/common';
import {User} from "./user.interface";
import {Response} from '../Interfaces/Response';
import {UsersService} from "./users.service";
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService, private auth: AuthService) {
        this.userService = userService;
        this.auth = auth;
    }


    @Post("/register")
    createUser(@Body() user: User): Response<null> {
        if (!user) {
            return new Response<null>(400, "Bad Request", null);
        }

        if (user.username == null || user.password == null || user.email == null) {
            return new Response<null>(400, "Bad Request", null);
        } else {
            if (this.userService.createUser(user)) {
                return new Response<null>(200, "User created", null);
            }
            else {
                return new Response<null>(409, "User already exists", null);
            }
        }
    }

    @Post("/login")
    async login(@Body() user: {username: string, password: string}): Promise<Response<{ token: string } | null>> {
        if (!user) {
            return new Response<null>(400, "Bad Request", null);
        }
        if (!user.username || !user.password) {
            return new Response<null>(400, "Bad Request", null);
        }
        let token = await this.auth.signIn(user.username, user.password);
        if (token) {
            return new Response<{ token: string }>(200, "User logged in", token );
        } else {
            return new Response<null>(401, "Unauthorized", null);
        }
    }

    /**
     * Logs the user out, destroying his token form the users service
     * */
    logout() {
        throw new Error("Method not implemented.");
    }

    /**
     * sets the invitation status, either accepted or declined
     * @param invitationId
     * @param status
     *
     * */
    handleInvitation(invitationId: string, status: any) {
        throw new Error("Method not implemented.");
    }

    /**
     * Lists all active invitations for the user
     *
     * @header user token, to identify the user and his roles
     * */
    showInvitations() {
        throw new Error("Method not implemented.");
    }
}
