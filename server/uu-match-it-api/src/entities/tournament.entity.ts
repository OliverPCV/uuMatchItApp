import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';


@Entity()
export class TournamentEntity {


  constructor() {
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  ownerId: string;

  @ManyToMany(() => UserEntity)
  @JoinTable() players: UserEntity[];
}
