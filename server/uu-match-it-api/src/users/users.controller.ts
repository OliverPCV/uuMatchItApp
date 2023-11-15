import {Body, Controller, Post} from '@nestjs/common';
import {User} from "./user.interface";

@Controller('users')
export class UsersController {


    @Post("/register")
    createUser(@Body() user: User): User {
        return user;
    }

    @Post("/login")
    login(@Body() user: User): User {
        return user;
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
