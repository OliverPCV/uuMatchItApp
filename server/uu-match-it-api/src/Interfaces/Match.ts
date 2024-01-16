import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Tournament } from './Tournament';
import { Team } from './Team';

@Entity()
export class Match {
  @PrimaryGeneratedColumn() id: number;
  @Column({ default: '' }) name: string;
  @Column() tournamentRoundText: string;
  @Column() startTime: Date;

  @Column({ nullable: true })
  state: MatchState | null;

  @ManyToOne(() => Match, match => match.id, { nullable: true, cascade: true, onDelete: 'SET NULL' })
  nextMatch: Match;

  @ManyToOne(() => Tournament, (tournament) => tournament.matches,{onDelete: 'CASCADE'})
  tournament: Tournament;

  @OneToMany(() => MatchParticipant, (matchParticipant) => matchParticipant.match, {cascade: true, onDelete: 'CASCADE'})
  matchParticipants: MatchParticipant[];


  constructor(name: string, tournamentRoundText: string, startTime: Date, tournament: Tournament, teams: (Team | undefined)[], nextMatch: Match = null) {
    this.name = name;
    this.tournamentRoundText = tournamentRoundText;
    this.startTime = startTime;
    this.tournament = tournament;
    this.nextMatch = nextMatch;
    if (teams) {
      teams = teams.filter(team => team);
      if (teams.length === 1) {
        this.matchParticipants = [new MatchParticipant(this, teams[0], MatchState.WALK_OVER)];
      } else this.matchParticipants = teams.map(team => {
        if (team) return new MatchParticipant(this, team);
      });
    }
  }
}

@Entity()
export class MatchParticipant {
  id: number;
  @ManyToOne(() => Match, (match) => match.matchParticipants, { onDelete: 'CASCADE'})
  match: Match;

  @PrimaryColumn()
  teamId: number;

  @ManyToOne(() => Team, (team) => team.id)
  team: Team | undefined;

  @Column({default: ''})
  resultText: string;

  @Column({ default: false })
  isWinner: boolean;

  @Column({ nullable: true })
  status: MatchState | null;

  name: string;


  constructor(match: Match, team: Team, status: MatchState = null) {
    this.isWinner = false;
    this.match = match;
    this.team = team;
    this.name = this.team?.name;
    if (team){
      this.name = team.name;
      this.teamId = team.id;
    }
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
