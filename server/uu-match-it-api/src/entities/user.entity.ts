import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class UserEntity {

    constructor(name: string, password: string, birthdate: Date) {
        this.username = name;
        this.birthdate = birthdate;
    }

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    hash: string;

    @Column()
    birthdate: Date;


}
