export class Config {
  public bo: number
  public pointsPerMatchWin: number
  public pointsPerMatchTie: number
  public pointsPerGameWin: number
  public pointsPerBye: number

  constructor({
    bo,
    pointsPerMatchWin,
    pointsPerMatchTie,
    pointsPerGameWin,
    pointsPerBye,
  }: {
    bo: number
    pointsPerMatchWin: number
    pointsPerMatchTie: number
    pointsPerGameWin: number
    pointsPerBye: number
  }) {
    this.bo = bo
    this.pointsPerMatchWin = pointsPerMatchWin
    this.pointsPerMatchTie = pointsPerMatchTie
    this.pointsPerGameWin = pointsPerGameWin
    this.pointsPerBye = pointsPerBye
  }

  public setBoValue(bo:number) {
    this.bo = bo
  }

  public setPointsPerMatchWin(pointsPerMatchWin : number) {
    this.pointsPerGameWin =pointsPerMatchWin
  }

  public setPointsPerMatchTie(pointsPerMatchTie:number) {
    this.pointsPerMatchTie = pointsPerMatchTie
  }

  public setPointsPerGameWin(pointsPerGameWin:number) {
    this.pointsPerGameWin = pointsPerGameWin
  }

  public setPointsperBye(pointsPerBye:number) {
    this.pointsPerBye =pointsPerBye
  }

}

