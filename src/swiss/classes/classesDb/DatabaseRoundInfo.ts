

export class DatabaseRoundInfo {
    public tournament_id: string = ""
    public round : number = 0
    public match: MatchDB[] = [] //Crear MatchDB, crear PlayerDB alimentar con eso esto y devolver este objeto para que la DB guarde

}