import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tournament {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column() ownerId: number;
  @Column() type: string;
  @Column() teams: number[];
  @Column() isFinished: boolean;
  @Column() date: Date;
  @Column() place: string;
  @Column() prize: number | string | null;
}
