import { Injectable } from '@nestjs/common';
import {User} from "./user.interface";
import * as bcrypt from "bcrypt";
@Injectable()
export class UsersService {
    private users: User[] = [
        { id: '1842534d-8a45-4997-a05e-2048a8780f19', email: "", username: 'Dad', password: '$2b$10$F6KGjPozq07ArmOJxPj9ieKqnS8WF8ahrTQzLnWJ3kV6tnCAwFlk.' }, // Plain text password: password123
        { id: 'e03258eb-d1f5-4a06-9248-2fc5e2abcd13', email: "", username: 'Mom', password: '$2b$10$i8iYse97KCVgw400vl1ii.GmqVADNuhB1fmDgIlPSSK8XYX.kceJK' }, // Plain text password: securepass456
        { id: '95d4dd95-801e-4a27-9d15-6969d9a326e0', email: "", username: 'Son', password: '$2b$10$tghCswLTQeiS2P.MhEr3VechQE4iGhr1wC7AsqzxD6obkOX0WVIWW' }, // Plain text password: 1234567890
        { id: 'b08f1a1b-4998-4e3d-a15f-762151bfc1d4', email: "", username: 'Daughter', password: '$2b$10$nsbR4b7A5cF1nehkfmBFauPVALD1muNVghfHJUQgfgcEOFLLKI8bS' }, // Plain text password: letmein
        { id: '4e2073e7-a148-4bac-ac54-b93d5480b348', email: "", username: 'Niece', password: '$2b$10$JYfxPQCt90UvGt.pxZsTsexroXfUr3zomqtRvK62WnD1DwuJc7XcG' }, // Plain text password: strongPassword
    ];

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

}
