import { Match } from "./Match";
import { Player } from "./Player";
import { gameUtils } from "./utils/utils";

export class Round {
  private unplayedMatches: Match[] = [];
  public matches: Match[] = [];
  public roundNumber: number = 0;
  private seed: number;
  private players: Player[];
  private roundUnfairness: number = 0; //Acá creo que podria sacar esto del constructor, pero no estoy seguro

  constructor({
    unplayedMatches,
    seed,
    players,
  }: {
    unplayedMatches: Match[];
    seed: number;
    players: Player[];
    roundUnfairness: number;
  }) {
    this.unplayedMatches = unplayedMatches;
    this.seed = seed;
    this.players = players;
  }

  private addRandomMatchToMatches() {
    const roundMatchLength = this.unplayedMatches.length;
    const randomMatch =
      this.unplayedMatches[gameUtils.getRandomInt(roundMatchLength, this.seed)];
    this.matches.push(randomMatch);
  }

  public getRandomMatches() {
    let playersWithoutMatch = new Set(this.players);
    while (playersWithoutMatch.size >= 1) {
      this.addRandomMatchToMatches();
      const unplayedMatches = gameUtils.setUnplayedMatchesByPlayedMatches({
        unplayedMatches: this.unplayedMatches,
        matches: this.matches,
      });
      playersWithoutMatch = gameUtils.reduceUnplayedMatches({
        unplayedMatch: unplayedMatches,
      });
      this.unplayedMatches = unplayedMatches;
    }
  }

  public filterMatchesByWins() {
    this.unplayedMatches = gameUtils.sameWinsMatches({
      unplayedMatches: this.unplayedMatches,
    });
  }

  public getPairedMatches() {
    let playersWithoutMatch = new Set(this.players);

    this.filterMatchesByWins();
    while (playersWithoutMatch.size >= 1) {
      this.addRandomMatchToMatches();
      this.unplayedMatches = gameUtils.setUnplayedMatchesByPlayedMatches({
        unplayedMatches: this.unplayedMatches,
        matches: this.matches,
      });
      playersWithoutMatch = gameUtils.reduceUnplayedMatches({
        unplayedMatch: this.unplayedMatches,
      });
    }
  }

  private buildCombination(
    //creo que es imposible escaper a las variables acá por la recursividad
    currentCombination: Match[],
    startIndex: number,
    result: Match[][]
  ) {
    const matchsPerRound = Math.floor((this.players.length + 1) / 2);

    if (currentCombination.length === matchsPerRound) {
      //Check the number of player to know the total number of iterations (need to check with odd players)
      result.push([...currentCombination]);
      return;
    }

    for (let i = startIndex; i < this.unplayedMatches.length; i++) {
      const newMatch = this.unplayedMatches[i];

      if (
        currentCombination.every(
          (match) =>
            match.player1.player !== newMatch.player1.player &&
            match.player1.player !== newMatch.player2.player &&
            match.player2.player !== newMatch.player1.player &&
            match.player2.player !== newMatch.player2.player
        )
      ) {
        currentCombination.push(newMatch);
        this.buildCombination(currentCombination, i + 1, result);
        currentCombination.pop();
      }
    }
  }

  private getValidCombinations() {
    const result: Match[][] = [];
    this.buildCombination([], 0, result);
    return result;
  }

  private getRoundUnfairness() {
    for (let match = 0; match < this.matches.length; match++) {
      this.roundUnfairness += this.matches[match].unfairness;
    }
  }

  private appendRound(roundArray: Round[]) {
    //Temporal method to select a round when multple rounds have same unfairness
    return roundArray[0] ? roundArray[0] : console.log("Error");
  }

  private getFairMatch(validCombinations: Match[][]) {
    let unfairnessArray = [];
    for (
      let posibleRound = 0;
      posibleRound < validCombinations.length;
      posibleRound++
    ) {
      let roundToAppend = new Round({
        players: this.players,
        unplayedMatches: this.unplayedMatches,
        seed: this.seed,
        roundUnfairness: 0,
      });
      roundToAppend.matches = validCombinations[posibleRound];
      roundToAppend.getRoundUnfairness();
      unfairnessArray.push(roundToAppend);
    }
    unfairnessArray.sort((a, b) => a.roundUnfairness - b.roundUnfairness);
    return unfairnessArray;
  }

  private getRoundFairness() {
    for (let match = 0; match < this.unplayedMatches.length; match++) {
      this.unplayedMatches[match].calculateFairness();
    }
  }

  public getRound() {
    this.getRoundFairness();

    const unfairnessArray = this.getFairMatch(this.getValidCombinations());

    const appendRound = this.appendRound(unfairnessArray);

    appendRound
      ? (this.matches = appendRound.matches)
      : console.log("Error en getRound -> appendRound matches"); //Esto es medio raro, pero me saca el error
    appendRound
      ? (this.roundUnfairness = appendRound.roundUnfairness)
      : console.log("Error en getRound -> appendRound roundUnfairness");
  }
}
