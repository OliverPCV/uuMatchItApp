import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => Match, { nullable: true, cascade: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'nextMatchId' })
  nextMatch: Match | null;

  @Column({ nullable: true })
  nextMatchId: number | null;

  @ManyToOne(() => Tournament, (tournament) => tournament.matches,{onDelete: 'CASCADE'})
  tournament: Tournament;

  @OneToMany(() => MatchParticipant, (matchParticipant) => matchParticipant.match, {cascade: true, onDelete: 'CASCADE'})
  participants: MatchParticipant[];


  constructor(name: string, tournamentRoundText: string, startTime: Date, tournament: Tournament, teams: (Team | undefined)[], nextMatch: Match = null) {
    this.name = name;
    this.tournamentRoundText = tournamentRoundText;
    this.startTime = startTime;
    this.tournament = tournament;
    this.nextMatchId = nextMatch ? nextMatch.id : null;
    if (teams) {
      teams = teams.filter(team => team);
      if (teams.length === 1) {
        this.participants = [new MatchParticipant(this, teams[0], MatchState.WALK_OVER)];
      } else this.participants = teams.map(team => {
        if (team) return new MatchParticipant(this, team);
      });
    }
  }
}

@Entity()
export class MatchParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Match, (match) => match.participants, { onDelete: 'CASCADE'})
  match: Match;

  @Column()
  teamId: number;

  @ManyToOne(() => Team, (team) => team.id)
  team: Team | undefined;

  @Column({default: ''})
  resultText: string;

  @Column({ default: false })
  isWinner: boolean;

  @Column({ nullable: true })
  status: MatchState | null;

  @Column({nullable: true})
  goals: number;

  constructor(match: Match, team: Team, status: MatchState = null) {
    this.isWinner = false;
    this.match = match;
    this.team = team;
    if (team){
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
