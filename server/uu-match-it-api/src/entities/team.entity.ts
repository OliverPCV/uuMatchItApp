import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TeamEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ownerId: string;
}
