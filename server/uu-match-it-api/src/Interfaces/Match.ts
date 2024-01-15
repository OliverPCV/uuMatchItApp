import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Tournament } from './Tournament';
import { Team } from './Team';

@Entity()
export class Match {
  @PrimaryGeneratedColumn() id: number;
  @Column({default: ""}) name: string;
  @Column() tournamentRoundText: string;
  @Column() startTime: Date;

  @Column({nullable: true})
  state: MatchState | null;

  @ManyToOne( () => Match, match => match.id, {nullable: true})
  nextMatch: Match;


  @ManyToOne( () => Tournament, (tournament) => tournament.matches)
  tournament: Tournament;

  @OneToMany( () => MatchParticipant, (matchParticipant) => matchParticipant.match)
  matchParticipants: MatchParticipant[];
}

@Entity()
export class MatchParticipant {
  id: number;
  @ManyToOne( () => Match, (match) => match.matchParticipants)
  match: Match;

  @PrimaryColumn()
  teamId: number;

  @ManyToOne( () => Team, (team) => team.id)
  team: Team;

  @Column()
  resultText: string;

  @Column({default: false})
  isWinner: boolean;

  @Column({nullable: true})
  status: MatchState | null;

  name: string;


  constructor(match: Match, team: Team, resultText: string, status: MatchState | null) {
    if (match && team) {
      this.name = team.name;
      this.id = team.id;
    }
    this.match = match;
    this.team = team;
    this.resultText = resultText;
    this.status = status;
  }
}

export enum MatchState {
  SCHEDULED = 'SCHEDULED',
  DONE = 'DONE',
  SCORE_DONE = 'SCORE_DONE',
  NO_SHOW = 'NO_SHOW',
  WALK_OVER = 'WALK_OVER',

}
