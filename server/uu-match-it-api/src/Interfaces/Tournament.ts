export class Tournament {
  id: number
  name:  string
  ownerId: number
  type: string
  teams: number[]
  isFinished: boolean
  date: Date
  place: string
  prize: number | null
}
