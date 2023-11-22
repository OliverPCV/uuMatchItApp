import { Injectable } from '@nestjs/common';
import {User} from "./user.interface";

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            username: "test",
            password: "test",
            email: ""

        },
        {
            username: "test2",
            password: "test2",
            email: ""

        },
        {
            username: "test3",
            password: "test3",
            email: ""
        }];

    getUsers(): User[] {
        return this.users;
    }

    createUser(user: User): boolean {
        throw new Error("Method not implemented.");
    }

}
