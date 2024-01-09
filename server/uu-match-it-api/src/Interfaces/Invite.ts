import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Invite {


  constructor(teamId: number, userId: number) {
    this.teamId = teamId;
    this.userId = userId;
    this.state = InviteState.PENDING;
  }

  @PrimaryGeneratedColumn() id: number;

  @Column() teamId: number;
  @Column() userId: number;
  @Column() state: InviteState;
}

export enum InviteState {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
}
