import { Injectable } from '@nestjs/common';
import {User} from "../Interfaces/User";
import * as bcrypt from "bcrypt";


enum InviteState {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
}

@Injectable()
export class UsersService {
    private users: User[] = [
      {id: "1", username: "jannovak", email: "jan.novak@example.com", password: "$2a$10$PitXFJ5T2SR2rRimhH7tHOge73YhBl9Okb9YF3HiHqLdvwgOgVq3y"}]; //strongpassword10

    private invites: any[] = [

    ]

    /**
     * TODO will be reimplemented to allow for database access
     * */
    findUser(username: string): User {
        for (let user of this.users) {
            if (user.username === username) {
                return user;
            }
        }
        return null;
    }

    getUsers(): User[] {
        return this.users;
    }

    createUser(user: User): boolean {
        let tempuser = this.findUser(user.username);

        if (tempuser) {
            return false;
        }

        user.password = bcrypt.hashSync(user.password, 10);
        this.users.push(user);
        return true;
    }

    inviteUserToTeam(teamId: string, userId: string) {
      this.invites.push({
        teamId: teamId,
        userId: userId,
        state: InviteState.PENDING,
      })
    }

}
