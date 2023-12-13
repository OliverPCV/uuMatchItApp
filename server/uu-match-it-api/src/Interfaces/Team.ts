import { User } from '../users/user.interface';

export class Team {
  id: number;
  name: string;
  score: number;
  players: User[];
}
