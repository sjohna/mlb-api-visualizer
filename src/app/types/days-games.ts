import { DaysGameDetails } from "./days-game-details";

export class DaysGames {
  games: DaysGameDetails[] = [];

  constructor(gamesData: any = undefined) {
    if (gamesData && gamesData.games && gamesData.games.length) {
      for (let game of gamesData.games) {
        this.games.push(new DaysGameDetails(game));
      }
    } 
  }
}