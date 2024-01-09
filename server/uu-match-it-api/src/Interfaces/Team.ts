import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Team {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;

  @ManyToOne( () => User, user => user.id)
  owner: User;

  @ManyToMany(() => User)
  @JoinTable()
  players: User[];
}
