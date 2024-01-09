import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Invite {


  constructor(teamId: string, userId: string) {
    this.teamId = teamId;
    this.userId = userId;
    this.state = InviteState.PENDING;
  }

  @PrimaryGeneratedColumn() id: number;

  @Column() teamId: string;
  @Column() userId: string;
  @Column() state: InviteState;
}

export enum InviteState {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
}
