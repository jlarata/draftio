export class DatabaseInfo {
    public date: string
    public name: string
    public leagueID: string
    public touranmentID: string //this should returned from db somehow O lo puedo crear yo 
    public ChampionUuid: string
  
    constructor({
      date = "",
      name = "",
      leagueID = "",
      touranmentID = "",
      ChampionUuid = "",
    }: {
      date?: string
      name?: string
      leagueID?: string
      touranmentID?: string
      ChampionUuid?: string

    } = {}) {
      this.date = date
      this.name = name
      this.leagueID = leagueID
      this.touranmentID = touranmentID
      this.ChampionUuid = ChampionUuid
    } 
  }
  
  