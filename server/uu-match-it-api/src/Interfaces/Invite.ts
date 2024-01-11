import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Team } from './Team';

@Entity()
export class Invite {


  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, team => team.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'teamId' })
  team: Team;

  @Column()
  userId: number;

  @Column()
  state: InviteState;

  constructor(team: number | Team, userId: number) {
    if (typeof team === 'number') {
      this.team = { id: team } as Team;
    } else this.team = team;
    this.userId = userId;
    this.state = InviteState.PENDING;
  }
}

export enum InviteState {
  PENDING = 'PENDING', ACCEPTED = 'ACCEPTED', DECLINED = 'DECLINED',
}
