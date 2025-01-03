export class DatabaseInfo {
    public date: string | undefined
    public name: string | undefined
    public leagueID: string | undefined
    public ChampionUuid: string | undefined
  
    constructor({
      date,
      name,
      leagueID,
      ChampionUuid,
    }: {
      date?: string
      name?: string
      leagueID?: string
      ChampionUuid?: string

    }) {
      this.date = date
      this.name = name
      this.leagueID = leagueID
      this.ChampionUuid = ChampionUuid
    } 
  }
  
  