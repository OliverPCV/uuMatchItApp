import {Body, Controller, Post} from '@nestjs/common';
import {User} from "./user.interface";
import {Response} from '../Interfaces/Response';
import {UsersService} from "./users.service";
import {AuthService} from "../auth/auth.service";

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {
        this.userService = userService;
    }


    @Post("/register")
    createUser(@Body() user: User): Response<User> {
        throw new Error("Method not implemented.");
        if (user.username == null || user.password == null || user.email == null) {
            return new Response<null>(400, "Bad Request", null);
        } else {
            if (this.userService.createUser(user)) {
                return new Response<User>(200, "User created", user);
            }
            else {
                return new Response<null>(409, "User already exists", null);
            }
        }
    }

    @Post("/login")
    login(@Body() user: User): Response<null> {
        throw new Error("Method not implemented.");
        if (user.username == null || user.password == null) {
            return new Response<null>(400, "Bad Request", null);
        }
        return new Response<null>(200, "User logged in", null);
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
