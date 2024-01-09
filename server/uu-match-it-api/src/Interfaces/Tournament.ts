import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Team } from './Team';

@Entity()
export class Tournament {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;

  @ManyToOne( () => User, user => user.id)
  owner: User;

  @Column() type: string;

  @ManyToMany(() => Team)
  @JoinTable()
  teams: Team[];

  @Column() isFinished: boolean;
  @Column() date: Date;
  @Column() place: string;
  @Column() prize: string;
}
