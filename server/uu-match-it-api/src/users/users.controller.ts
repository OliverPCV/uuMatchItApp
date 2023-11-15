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


}
